if (typeof process !== "undefined" && process.env) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
import { defineEventHandler, getQuery, createError, setHeader } from "h3";
import { ofetch } from "ofetch";

const ALLOWED_HOSTS = /^img[1-9]\.doubanio\.com$/;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const raw = (query.url as string) || "";
  const url = decodeURIComponent(raw);

  if (!url || !url.startsWith("https://")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid url" });
  }

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid url" });
  }

  if (!ALLOWED_HOSTS.test(host)) {
    throw createError({ statusCode: 403, statusMessage: "Host not allowed" });
  }

  try {
    const resp = await ofetch<ArrayBuffer>(url, {
      responseType: "arrayBuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://movie.douban.com/",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      timeout: 10000,
      retry: 1,
    });

    const buffer = Buffer.from(resp);
    setHeader(event, "Cache-Control", "public, max-age=86400");
    const ext = url.split(".").pop()?.toLowerCase() || "jpg";
    const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    setHeader(event, "Content-Type", mime);
    return buffer;
  } catch (error: any) {
    // 失败时优雅返回占位海报图，防止控制台 503 报错
    setHeader(event, "Content-Type", "image/svg+xml");
    setHeader(event, "Cache-Control", "public, max-age=3600");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="160" viewBox="0 0 120 160"><rect width="120" height="160" fill="#1f2937"/><text x="60" y="88" font-size="28" text-anchor="middle" fill="#9ca3af">🎬</text></svg>`;
  }
});
