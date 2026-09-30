import { SearchService, type SearchServiceOptions } from "./searchService";
import { PluginManager, registerGlobalPlugin } from "../plugins/manager";
import { HunhepanPlugin } from "../plugins/example/hunhepan";
import { OugePlugin } from "../plugins/ouge";
import { WanouPlugin } from "../plugins/wanou";
import { SusuPlugin } from "../plugins/susu";
import { ThePirateBayPlugin } from "../plugins/thepiratebay";
import { PansearchPlugin } from "../plugins/pansearch";
import { NyaaPlugin } from "../plugins/nyaa";

const SERVICE_CONTEXT_KEY = "__panhub_search_service__";

/**
 * 创建插件管理器并注册所有可用插件
 */
function createPluginManager(): PluginManager {
  const pm = new PluginManager();
  // 注册已验证且稳定可用的插件数据源
  registerGlobalPlugin(new HunhepanPlugin());
  registerGlobalPlugin(new PansearchPlugin());
  registerGlobalPlugin(new WanouPlugin());
  registerGlobalPlugin(new OugePlugin());
  registerGlobalPlugin(new SusuPlugin());
  registerGlobalPlugin(new ThePirateBayPlugin());
  registerGlobalPlugin(new NyaaPlugin());
  pm.registerAllGlobalPlugins();
  return pm;
}

/**
 * 创建搜索服务选项
 */
function createServiceOptions(runtimeConfig: any): SearchServiceOptions {
  return {
    priorityChannels: runtimeConfig.priorityChannels || [],
    defaultChannels: runtimeConfig.defaultChannels || [],
    defaultConcurrency: runtimeConfig.defaultConcurrency || 10,
    pluginTimeoutMs: runtimeConfig.pluginTimeoutMs || 15000,
    cacheEnabled: !!runtimeConfig.cacheEnabled,
    cacheTtlMinutes: runtimeConfig.cacheTtlMinutes || 30,
  };
}

/**
 * 获取或创建搜索服务实例
 * 使用 Nitro 上下文存储，支持测试时重置
 */
export function getOrCreateSearchService(runtimeConfig: any): SearchService {
  // 尝试从 Nitro 上下文获取
  const context = (globalThis as any)[SERVICE_CONTEXT_KEY];
  if (context?.service) {
    return context.service;
  }

  // 创建新实例
  const options = createServiceOptions(runtimeConfig);
  const pluginManager = createPluginManager();
  const service = new SearchService(options, pluginManager);

  // 存储到上下文
  (globalThis as any)[SERVICE_CONTEXT_KEY] = { service, options, pluginManager };
  return service;
}

/**
 * 重置搜索服务实例（仅用于测试）
 */
export function resetSearchService(): void {
  delete (globalThis as any)[SERVICE_CONTEXT_KEY];
}

/**
 * 获取搜索服务统计信息（用于监控）
 */
export function getSearchServiceStats(): { exists: boolean; options?: SearchServiceOptions } {
  const context = (globalThis as any)[SERVICE_CONTEXT_KEY];
  if (!context) {
    return { exists: false };
  }
  return {
    exists: true,
    options: context.options,
  };
}
