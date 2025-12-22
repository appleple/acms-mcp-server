import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { cmsGet } from '../cms-client.js';
import { createTextResponse } from '../utils/response.js';
/**
 * 全文検索ツールを登録
 * 例: acms_find_entries { keyword: "キーワード", page: 1 }
 */
export function registerFindTool(server) {
    server.registerTool('acms_find_entries', {
        title: 'Search and find information',
        description: 'a-blog cms に登録されているコンテンツ（記事、エントリー）をキーワードで検索します。CMSに保存されている実際のコンテンツデータを検索・取得するためのツールです。テンプレートコードやスニペットを探す場合は、リソース（acms://module/snippets）を参照してください。',
        inputSchema: {
            keyword: z.string().optional(),
            page: z.number().int().positive().max(100).default(1),
        },
    }, async ({ keyword, page }) => {
        const params = {
            page,
        };
        if (keyword)
            params.keyword = keyword;
        const data = await cmsGet('mcp_entry_summary', params);
        // レスポンスを処理して、次のアクションを明示的に追加
        let processedData = data;
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            const dataObj = data;
            // エントリーリストがある場合、各エントリーに次のアクション情報を追加
            let entriesKey = null;
            let entries = null;
            if (Array.isArray(dataObj.items)) {
                entriesKey = 'items';
                entries = dataObj.items;
            }
            if (entries && entriesKey) {
                const enrichedEntries = entries.map((entry) => {
                    const enriched = { ...entry };
                    // bidとeidが存在する場合、次のアクションを追加
                    if (typeof entry.bid === 'number' &&
                        typeof entry.eid === 'number') {
                        enriched._next_action = {
                            tool: 'acms_get_entry',
                            params: {
                                bid: entry.bid,
                                eid: entry.eid,
                            },
                            description: `この記事の詳細を取得するには、acms_get_entryツールを呼び出してください。`,
                        };
                    }
                    return enriched;
                });
                processedData = {
                    ...dataObj,
                    [entriesKey]: enrichedEntries,
                    _instructions: '各エントリーの詳細を取得するには、_next_actionに記載されているacms_get_entryツールを使用してください。ブラウザで検索する必要はありません。',
                };
            }
        }
        return createTextResponse(processedData);
    });
}
//# sourceMappingURL=find.js.map