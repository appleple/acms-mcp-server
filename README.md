# a-blog CMS MCP Server

a-blog CMSのGET APIを活用するMCP（Model Context Protocol）サーバーです。

## 機能

- **コンテンツ取得**: エントリーの一覧取得、詳細取得
- **検索機能**: キーワード検索、日付範囲検索、カテゴリー絞り込み
- **メタデータ取得**: コレクション一覧、カテゴリー一覧
- **統計・分析**: コレクションの統計情報、コンテンツ分析
- **エクスポート**: Markdown形式でのエクスポート
- **データ検証**: エントリーの整合性チェック

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

以下の環境変数を設定してください：

- `ACMS_BASE`: a-blog CMSのAPIベースURL（例: `https://your-cms.example.com`）
- `ACMS_X_API_KEY`: a-blog CMSのAPIキー

## 使用方法

### Claude Desktopでの設定

1. Claude Desktopの設定ファイルを開きます：
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. 以下の設定を追加または編集します：

```json
{
  "mcpServers": {
    "acms": {
      "command": "npx",
      "args": ["-y", "acms-mcp-server"],
      "env": {
        "ACMS_BASE": "https://your-cms.example.com/api/",
        "ACMS_X_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**ローカル開発の場合**: パッケージをnpmレジストリに公開していない場合は、以下のいずれかの方法を使用してください：

**方法A: npm linkを使用**

```bash
cd /path/to/acms-mcp-server
npm link
```

その後、設定ファイルで：

```json
{
  "mcpServers": {
    "acms": {
      "command": "npx",
      "args": ["-y", "acms-mcp-server"],
      "env": { ... }
    }
  }
}
```

**方法B: 直接パスを指定**

```json
{
  "mcpServers": {
    "acms": {
      "command": "npx",
      "args": ["-y", "/絶対パス/to/acms-mcp-server"],
      "env": { ... }
    }
  }
}
```

3. Claude Desktopを再起動します。

### Cursorでの設定

1. Cursorの設定を開きます：
   - `Ctrl + Shift + P`（Windows/Linux）または `Cmd + Shift + P`（macOS）でコマンドパレットを開く
   - `Cursor Settings`を選択
   - 左側のメニューから`MCP`を選択

2. `Add new global MCP server`をクリックして、以下の設定を追加：

```json
{
  "mcpServers": {
    "acms": {
      "command": "npx",
      "args": ["-y", "acms-mcp-server"],
      "env": {
        "ACMS_BASE": "https://your-cms.example.com/api/",
        "ACMS_X_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**ローカル開発の場合**: Claude Desktopと同様に、`npm link`を使用するか、直接パスを指定してください。

3. Cursorを再起動します。

## アイコンの設定

Claude Desktopでアイコンを表示するには、プロジェクトルートに`icon.png`ファイルを配置してください。

- 推奨サイズ: 128x128ピクセル
- 形式: PNG
- ファイル名: `icon.png`

`manifest.json`でアイコンパスが指定されています。

## 利用可能なツール

### 基本操作

- `acms_find` - 全文検索をして記事を検索
- `acms_get` - ID/コードで1件取得
- `acms_collections` - 利用可能なコレクション一覧を取得

### 検索機能

- `acms_find` - キーワード検索

### 分析・統計

- （今後追加予定）

## リソース

- `cms://{collection}/{id}` - エントリーをリソースURIで参照

## 開発

### 開発モードで実行

```bash
npm run dev
```

### テスト

```bash
# acms_findツールのテスト
ACMS_BASE=https://your-cms.example.com ACMS_X_API_KEY=your-key npm run test:find
```

### コードフォーマット

```bash
npm run format
```

## ライセンス

ISC
