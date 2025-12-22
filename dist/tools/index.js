/**
 * ツール登録モジュール
 * すべてのツールを一括で登録する
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGetTool } from './get.js';
import { registerFindTool } from './find.js';
import { registerModulesTool } from './modules.js';
import { registerSnippetTool } from './snippet.js';
import { registerModuleDetailTool } from './module-detail.js';
/**
 * すべてのツールをサーバーに登録
 */
export function registerAllTools(server) {
    registerGetTool(server);
    registerFindTool(server);
    registerModulesTool(server);
    registerSnippetTool(server);
    registerModuleDetailTool(server);
}
//# sourceMappingURL=index.js.map