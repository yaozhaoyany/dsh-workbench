# dsh-workbench

An open-source workbench built on DeepSeek Harness, with planned WeChat, QQ,
and Slack bot entry points for development, projects, work, and websites.

基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的开源工作台。
目标是通过微信、QQ、Slack 管理开发任务、项目、日常工作和网站。

这是一个独立的社区项目，与 DeepSeek、腾讯和 Slack 没有隶属关系。
采用固定版本的 dsh 依赖和独立插件扩展，当前没有修改或复制上游核心。

## 当前进度

| 能力 | 状态 |
| --- | --- |
| 本地启动 dsh Web、隔离运行配置 | 已实现 |
| 跨平台 Node.js 启动器、基础测试、CI 配置 | 已实现；其他系统待 CI 验证 |
| 微信 / QQ / Slack 双向消息 | 待开发 |
| 跨渠道会话选择、开发和网站工作流 | 待开发 |

本仓库当前是可运行的项目起点，不是已完成的多渠道机器人产品。

## 快速开始

需要 Node.js 26 和 npm。克隆本仓库后，在仓库目录运行：

```sh
npm ci
npm start
```

终端会显示带本地访问 token 的 URL，请打开完整 URL；默认端口为 3080。
启动器不自动打开浏览器。按 Ctrl+C 停止。
在 Settings → Models 配置模型提供商并选择模型后，才能开始 AI 对话。

```sh
npm test
npm run dsh -- --help
npm run dsh -- plugin --profile web add <plugin-package>
```

最后一个命令会安装并运行第三方插件，请先确认其来源及版本兼容性。

## 配置与数据

- dsh 固定为 `0.2.1-rc.2`；依赖版本由 `package-lock.json` 固定。
- 默认运行目录为仓库根目录，dsh 凭据、会话和运行配置保存在 `.dsh/`。
- 可以通过环境变量 `DSH_HOME` 指定其他数据目录；相对路径基于仓库根目录解析。
- `.dsh/`、`node_modules/`、`.env` 和日志不进入 Git；不要提交机器人凭证或真实会话。
- 当前沿用 dsh 的权限设置。接入 IM 前必须增加用户授权检查；不要把未完成的通道开放给其他人执行命令。

## 扩展方向

三个通道复用同一 dsh 运行时及其工具和会话系统。
渠道适配负责消息收发、授权和会话映射；项目工作流通过 dsh 插件和 Skills 实现。
首版先验证一个渠道和一个开发任务，再增加其他渠道。

详见 [ROADMAP.md](ROADMAP.md) 和 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

本仓库原创代码使用 [MIT](LICENSE) 许可证。
DeepSeek Harness 和其他依赖保留各自许可证；它们没有随源码提交到此仓库。
