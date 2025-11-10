/**
 * CMS API クライアント
 * a-blog CMSのGET APIを呼び出す共通関数
 */

const ACMS_BASE = process.env.ACMS_BASE || '';
const ACMS_X_API_KEY = process.env.ACMS_X_API_KEY || '';

/**
 * 共通GETクライアント
 * @param path APIパス
 * @param params クエリパラメータ
 * @returns APIレスポンス（JSONまたは文字列）
 */
export async function cmsGet(
  path: string,
  params?: Record<string, string | number | boolean>
) {
  if (!ACMS_BASE) throw new Error('ACMS_BASE is not set');

  // ベースURLを正規化（末尾の / を1つに）
  const apiPath =
    '/api/v2/' + path.replace(/^\/+/, '').replace(/\/+$/, '') + '/';

  // /key/value 形式でパスを追加
  let urlPath = '';
  if (params) {
    const segments: string[] = [];
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue;
      segments.push(encodeURIComponent(key), encodeURIComponent(String(value)));
    }
    if (segments.length > 0) urlPath += segments.join('/');
  }
  urlPath = `${urlPath}${apiPath}`;
  urlPath = urlPath.replace(/^\/+/, '');

  // URLを作成
  const url = new URL(`${urlPath}`, ACMS_BASE);

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...(ACMS_X_API_KEY ? { 'X-API-KEY': ACMS_X_API_KEY } : {}),
    },
  });
  const body = await res.text();
  if (!res.ok)
    throw new Error(`CMS GET ${url} -> ${res.status}: ${body.slice(0, 300)}`);
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
