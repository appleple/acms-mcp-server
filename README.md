# a-blog cms MCP Server

a-blog cmsの GET APIを活用するMCP（Model Context Protocol）サーバーです。a-blog cmsに登録されているコンテンツの検索、詳細情報の取得、モジュール情報の取得、Twigテンプレートスニペットの取得などができます。

## 機能

- **検索機能**: キーワード検索（ページネーション対応）
- **コンテンツ取得**: エントリーの一詳細取得
- **モジュール情報**: 利用可能なモジュール一覧の取得、モジュール詳細情報の取得
- **スニペット取得**: 30個以上のV2モジュールのTwigテンプレートスニペット取得

## 設定

### a-blog cmsでの設定

`管理画面 > コンフィグ > API設定` から **API（V2）** を有効にして、`X-API-KEY` をメモします。

MCPサーバーがアクセスするためのAPIエンドポイントを作成するため、以下モジュールIDを作成します。
作成したモジュールIDは、 **APIでの取得を許可** にチェックを入れます。

#### 記事検索API
- **モジュール名**: V2_Entry_Summary
- **モジュールID**: mcp_entry_summary
- **説明**: 記事検索API用のモジュール
- **引数**: `キーワード` と `ページ` にチェック

#### 記事詳細API
- **モジュール名**: V2_Entry_Body
- **モジュールID**: mcp_entry_body
- **説明**: 記事詳細API用のモジュール
- **引数**: `エントリーID` にチェック

#### モジュールID一覧取得API

**McpModuleApi 拡張アプリ** が必要です。別途インストールしてください。

- **モジュール名**: V2_ModuleMeta_Index
- **モジュールID**: mcp_modules
- **説明**: モジュール一覧取得API用のモジュール
- **引数**: なし

#### モジュールID詳細取得API

**McpModuleApi 拡張アプリ** が必要です。別途インストールしてください。

- **モジュール名**: V2_ModuleMeta_Detail
- **モジュールID**: mcp_module_detail
- **説明**: モジュール詳細取得API用のモジュール
- **引数**: なし

### クライアント設定

`npx` を使って設定します。

- **ACMS_BASE**: a-blog cms のブログのURLを設定
- **ACMS_X_API_KEY**: メモしたAPIキーを設定

```
{
  "mcpServers": {
    "acms": {
      "command": "npx",
      "args": [
        "-y",
        "acms-mcp-server@beta",
      ],
      "env": {
        "ACMS_BASE": "https://example.com/",
        "ACMS_X_API_KEY": "xxxxxxxxxxxxx"
      }
    }
  }
}
```

### Cursorの場合

MCPサーバーを利用したいワークスペースで `.cursor/mcp.json` を作成して、上記jsonを設定します。

## 利用可能なツール

a-blog cms MCP Serverで利用可能なツールです。

| ツール名 | 説明 | パラメータ |
|---------|------|----------|
| `acms_find_entries` | a-blog cmsに登録されているコンテンツ（記事、エントリー）をキーワードで検索します。ページネーション対応（最大100ページ）。結果には各項目の識別子（bidとeid）が含まれ、`acms_get_entry`で詳細を取得できます。 | `keyword` (string, optional): 検索キーワード<br>`page` (number, optional): ページ番号（デフォルト: 1、最大: 100） |
| `acms_get_entry` | 識別子（bidとeid）を使用してエントリーの詳細情報を取得します。記事の本文、画像、メタデータ、設定情報などを取得できます。 | `bid` (number, required): ブログID<br>`eid` (number, required): エントリーID |
| `acms_modules` | a-blog cmsで利用可能なモジュールの一覧を取得します。レスポンスに含まれる`identifier`フィールドの値は、`acms_get_module_detail`の`moduleId`パラメータとして使用できます。 | なし |
| `acms_get_module_detail` | a-blog cmsのAPIからモジュールの詳細情報（変数、パラメータ、設定項目など）を取得します。スニペットに含まれていない変数や詳細なパラメータ情報も含まれます。 | `moduleId` (string, required): モジュールID（`acms_modules`で取得した`identifier`の値） |
| `acms_get_snippet` | a-blog cmsのモジュールのスニペット（テンプレートコード例）を取得します。30個以上のV2モジュールのTwigテンプレートコード、パラメータ、変数の使用例を参照できます。`acms_get_module_detail`と組み合わせて使用することで、完全なコード生成が可能になります。 | `moduleName` (string, required): モジュール名（例: `V2_Entry_Summary`, `V2_Entry_Body`） |

### 使用例

a-blog cms に登録されているコンテンツをマニュアルとして利用する。

```
a-blog cmsの校正オプションで、画像を300x300でトリミングしてリサイズしたいです。acmsツールを使用して
```

a-blog cms のコンテンツを取得してレビューしてもらう

```
xxxxxxのコンテンツを取得して、文章を校正して
```

a-blog cms のテンプレートを実装する。

```
添付したデザインをもとに、記事一覧を、news-listモジュールIDを使用して、実装してください。スタイルはtailwindcssでつけてください。
```


## ライセンス

MIT
