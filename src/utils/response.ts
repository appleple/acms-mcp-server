/**
 * レスポンスユーティリティ
 * ツールのレスポンスを生成する共通関数
 */

/**
 * テキストレスポンスを生成
 * @param data レスポンスデータ（文字列またはオブジェクト）
 * @returns MCPツールレスポンス
 */
export function createTextResponse(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}
