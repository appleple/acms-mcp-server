#!/usr/bin/env tsx

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAllTools } from './tools/index.js';

/**
 * MCPサーバーのメインエントリーポイント
 */
const server = new McpServer({ name: 'acms-mcp', version: '0.1.0' });

// すべてのツールとリソースを登録
registerAllTools(server);

// stdioでクライアントと接続（Claude DesktopやCursor等）
const transport = new StdioServerTransport();
await server.connect(transport);
