/**
 * データローダー
 * 静的ファイルからデータを読み込むユーティリティ
 */

import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルートのパスを取得
const projectRoot = join(__dirname, '../..');
const dataDir = join(projectRoot, 'data');

// キャッシュ
const cache = {
  snippets: new Map<string, unknown>(),
  schemas: new Map<string, unknown>(),
  moduleIds: null as unknown | null,
};

/**
 * 指定モジュールIDのスニペットを読み込む
 * @param moduleName モジュール名
 * @returns スニペットデータ
 */
export async function loadSnippets(moduleName: string): Promise<unknown> {
  // キャッシュを確認
  if (cache.snippets.has(moduleName)) {
    return cache.snippets.get(moduleName);
  }

  try {
    const filePath = join(dataDir, 'snippets', `${moduleName}.json`);
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    cache.snippets.set(moduleName, data);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to load snippets for module ${moduleName}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
