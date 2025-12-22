import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { cmsGet } from '../cms-client.js';
import { createTextResponse } from '../utils/response.js';
/**
 * モジュール詳細取得ツールを登録
 * 例: acms_get_module_detail { moduleId: "hoge" }
 */
export function registerModuleDetailTool(server) {
    server.registerTool('acms_get_module_detail', {
        title: 'Get module detail from API',
        description: 'a-blog cmsのAPIからモジュールの詳細情報（変数、パラメータ、設定項目など）を取得します。スニペットに含まれていない変数や詳細なパラメータ情報も含まれます。acms_get_snippetと組み合わせて使用することで、完全なコード生成が可能になります。moduleIdには、acms_modulesで取得した一覧のidentifierフィールドの値を使用してください。',
        inputSchema: {
            moduleId: z
                .string()
                .describe('モジュールID（acms_modulesで取得した一覧のidentifierフィールドの値。例: entry-list, news-list, news-detail）'),
        },
    }, async ({ moduleId }) => {
        if (!moduleId) {
            throw new Error('Module ID is required');
        }
        try {
            // APIからモジュール詳細を取得
            // エンドポイントは実際のAPIに合わせて調整が必要
            // 例: 'mcp_module_detail', 'mcp_modules/{moduleId}', 'module/{moduleId}/detail' など
            const data = await cmsGet('mcp_module_detail', { moduleId }, 'query');
            return createTextResponse({
                moduleId,
                detail: data,
                note: 'この情報はacms_get_snippetと組み合わせて使用することで、完全なコード生成が可能になります。スニペットには含まれていない変数や詳細なパラメータ情報も含まれています。',
            });
        }
        catch (error) {
            // APIエンドポイントが存在しない場合のエラー
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to load module detail for ${moduleId}: ${errorMessage}. ` +
                `APIエンドポイント 'mcp_module_detail' が存在しない可能性があります。` +
                `実際のAPIエンドポイントに合わせて、src/tools/module-detail.ts のエンドポイント名を調整してください。`);
        }
    });
}
//# sourceMappingURL=module-detail.js.map