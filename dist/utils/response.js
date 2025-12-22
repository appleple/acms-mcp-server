/**
 * レスポンスユーティリティ
 * ツールのレスポンスを生成する共通関数
 */
/**
 * テキストレスポンスを生成
 * @param data レスポンスデータ（文字列またはオブジェクト）
 * @returns MCPツールレスポンス
 */
export function createTextResponse(data) {
    return {
        content: [
            {
                type: 'text',
                text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
            },
        ],
    };
}
//# sourceMappingURL=response.js.map