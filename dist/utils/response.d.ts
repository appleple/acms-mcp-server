/**
 * レスポンスユーティリティ
 * ツールのレスポンスを生成する共通関数
 */
/**
 * テキストレスポンスを生成
 * @param data レスポンスデータ（文字列またはオブジェクト）
 * @returns MCPツールレスポンス
 */
export declare function createTextResponse(data: unknown): {
    content: {
        type: "text";
        text: string;
    }[];
};
//# sourceMappingURL=response.d.ts.map