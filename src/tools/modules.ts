import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { cmsGet } from '../cms-client.js';
import { createTextResponse } from '../utils/response.js';

/**
 * モジュール一覧取得ツールを登録
 * 例: acms_modules
 */
export function registerModulesTool(server: McpServer) {
  server.registerTool(
    'acms_modules',
    {
      title: 'List available modules ids',
      description:
        'a-blog cms で利用可能なモジュールの一覧を取得します。利用可能なモジュール機能を確認できます。a-blog cms のテンプレートの編集・作成に使用してください。',
      inputSchema: {},
    },
    async () => {
      const data = await cmsGet('/mcp_modules');
      return createTextResponse(data);
    }
  );
}
