/**
 * CMS API クライアント
 * a-blog cmsのGET APIを呼び出す共通関数
 */
/**
 * パラメータ形式のオプション
 */
export type ParamFormat = 'path' | 'query';
/**
 * 共通GETクライアント
 * @param path APIパス
 * @param params パラメータ
 * @param paramFormat パラメータ形式（'path': /key/value形式、'query': クエリパラメータ形式）
 * @returns APIレスポンス（JSONまたは文字列）
 */
export declare function cmsGet(path: string, params?: Record<string, string | number | boolean>, paramFormat?: ParamFormat): Promise<any>;
//# sourceMappingURL=cms-client.d.ts.map