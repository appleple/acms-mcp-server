import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { cmsGet } from '../cms-client.js';
import { createTextResponse } from '../utils/response.js';
/**
 * 詳細取得ツールを登録
 * 例: acms_get_entry { bid: 1, eid: 10 }
 */
export function registerGetTool(server) {
    server.registerTool('acms_get_entry', {
        title: 'Get detailed information',
        description: 'a-blog cmsの識別子（bidとeid）を使用して詳細な情報を取得します。記事の本文、画像、メタデータ、設定情報などを取得できます。調べ物や情報確認に使用してください。',
        inputSchema: {
            bid: z.number().describe('ブログID（acms_find_entriesの結果から取得）'),
            eid: z
                .number()
                .describe('エントリーID（acms_find_entriesの結果から取得）'),
        },
    }, async ({ bid, eid }) => {
        const params = {
            bid,
            eid,
        };
        const data = await cmsGet('mcp_entry_body', params);
        return createTextResponse(data);
    });
}
//# sourceMappingURL=get.js.map