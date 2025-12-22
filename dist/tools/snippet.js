import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { loadSnippets } from '../utils/data-loader.js';
import { createTextResponse } from '../utils/response.js';
/**
 * スニペット取得ツールを登録
 * 例: acms_get_snippet { moduleName: "V2_Entry_Summary" }
 */
export function registerSnippetTool(server) {
    server.registerTool('acms_get_snippet', {
        title: 'Get module snippet',
        description: 'a-blog cmsのモジュールのスニペット（テンプレートコード例）を取得します。V2_Entry_Summary、V2_Entry_Body, V2_Category_Tree などのV2モジュールのTwigテンプレートコード、パラメータ、変数の使用例を参照できます。テンプレート実装時に使用してください。重要: module()関数は module(\'モジュール名\', \'モジュールID\', {パラメータ}) の形式です。第1引数はモジュール名（例: V2_Entry_Summary）、第2引数はモジュールID（acms_modulesで取得したidentifier、例: test2）です。acms_get_module_detailと組み合わせて使用することで、スニペットに含まれていない変数や詳細なパラメータ情報も取得でき、完全なコード生成が可能になります。',
        inputSchema: {
            moduleName: z
                .string()
                .describe('モジュール名（例: V2_Entry_Summary, V2_Entry_Body, V2_Category_Tree）'),
        },
    }, async ({ moduleName }) => {
        if (!moduleName) {
            throw new Error('Module name is required');
        }
        try {
            const snippet = await loadSnippets(moduleName);
            return createTextResponse(snippet);
        }
        catch (error) {
            throw new Error(`Failed to load snippet for module ${moduleName}: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
}
//# sourceMappingURL=snippet.js.map