# Contributing

欢迎通过 Issue 描述需求或提交 PR。请注明 Node.js、操作系统和 dsh 版本，
不要在 Issue、日志或截图中包含凭证、访问 token 或私人会话。

## 开发

```sh
npm ci
npm test
npm start
```

优先通过独立 Cordis 插件和 dsh Profile 扩展，避免修改 `node_modules`。
渠道插件需要验证用户授权、重复消息、会话映射、断线恢复和审批行为。
开发过程中保持 README 的“当前进度”与实际功能一致。

升级 dsh 需要在单独的改动中更新固定版本和锁文件，并重新验证已接入的渠道。
提交前运行 `npm test` 和 `git diff --check`。
