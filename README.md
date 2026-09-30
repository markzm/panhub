# PanHub · 网盘资源搜索聚合引擎

> 专注纯净的跨平台网盘资源索引搜索工具 —— 即搜即查、智能去重、完全开源、零广告干扰、极简部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmarkzm%2Fpanhub&project-name=panhub&repository-name=panhub)
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/markzm/panhub)

---

## ⚖️ 重要免责与版权声明

> [!IMPORTANT]
> 1. **仅提供搜索索引**：本项目仅为一个纯粹的**开放网络资源聚合检索工具**，旨在提供便捷的跨网盘公开分享链接检索。
> 2. **本站不存储任何资源**：本系统及任何部署实例**本身不存储、不上传、不托管、不提供下载任何实际文件、音视频或数据资料**。
> 3. **版权归属原作者**：所有搜索结果与链接均实时抓取自互联网公开第三方渠道（如公共频道、开放索引），**一切内容版权及知识产权均归原作者及资源发布者所有**。
> 4. **合规提示**：使用本工具的用户应自觉遵守相关法律法规，请勿利用本工具检索传播侵权违法内容。如有相关链接侵犯了您的合法权益，请直接联系对应网盘存储服务商（百度、阿里、夸克、迅雷等）处理删除源文件。

---

## ✨ 核心特性

- 🔍 **多源聚合检索**：同时检索数十个精选公共频道与第三方稳定数据源。
- ⚡ **毫秒级极速响应**：优先通道并发检索，支持 LRU 智能内存缓存。
- 🧹 **去重与平台归类**：自动归类阿里云盘、夸克网盘、百度网盘、115网盘、迅雷云盘、天翼云盘、123网盘、移动云盘、UC网盘等，同一链接自动去重。
- 🚫 **无广告无干扰**：移除了所有第三方广告、引流推广与强制扫码，界面极简克制。
- 🔒 **访问控制密码门**：支持配置 `SEARCH_PASSWORD` 环境变量，一键为私有部署添加密码保护。
- ☁️ **Serverless 边缘部署**：原生适配 Vercel 与 Cloudflare Workers / Pages，海外节点直通全球网络。

---

## 🚀 快速开始

### 方式一：Vercel 一键部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmarkzm%2Fpanhub&project-name=panhub&repository-name=panhub)

1. 点击上方按钮，登录 Vercel 并选择导入项目。
2. Framework Preset 选择 `Nuxt.js`。
3. （可选）在 Environment Variables 中添加 `SEARCH_PASSWORD` 设置访问密码。
4. 点击 Deploy 即可完成上线。

### 方式二：Cloudflare Workers / Pages 部署

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/markzm/panhub)

1. 在 Cloudflare 控制台连接 GitHub 仓库 `markzm/panhub`。
2. 构建命令设为 `npm run build`，输出目录设为 `.output/public`。
3. 环境变量添加 `NODE_VERSION=20`。
4. 点击 Save and Deploy 即可发布至全球边缘节点。

### 方式三：本地开发与运行

```bash
# 1. 安装依赖
npm install

# 2. 本地开发调试
npm run dev

# 3. 运行自动化测试
npx vitest run

# 4. 构建并启动生产服务
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```

---

## ⚙️ 环境变量配置

| 变量名 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `SEARCH_PASSWORD` | 空 | 访问密码门（非空时必须输入正确密码方可使用搜索） |
| `PORT` | `3000` | Node 服务器监听端口 |
| `NITRO_PRESET` | `node-server` | 部署模式（`node-server` / `vercel` / `cloudflare-module`） |

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源发布。
