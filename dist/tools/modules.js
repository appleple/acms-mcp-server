import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { cmsGet } from '../cms-client.js';
import { createTextResponse } from '../utils/response.js';
/**
 * モジュール一覧取得ツールを登録
 * 例: acms_modules
 */
export function registerModulesTool(server) {
    server.registerTool('acms_modules', {
        title: 'List available modules ids',
        description: 'a-blog cms で利用可能なモジュールの一覧を取得します。利用可能なモジュール機能を確認できます。a-blog cms のテンプレートの編集・作成時の参照用として使用してください。レスポンスに含まれるidentifierフィールドの値は、acms_get_module_detailのmoduleIdパラメータとして使用できます。',
        inputSchema: {},
    }, async () => {
        let data;
        let source;
        // まずAPIから取得を試行
        try {
            data = await cmsGet('/mcp_modules');
            source = 'api';
        }
        catch (apiError) {
            throw new Error(`Failed to load module IDs from API: API error: ${apiError instanceof Error ? apiError.message : String(apiError)}`);
        }
        // レスポンスにモジュールIDの一覧を明示的に含める
        const response = {
            moduleIds: data,
            source,
        };
        return createTextResponse(response);
    });
}
//# sourceMappingURL=modules.js.map