# dsh-workbench

An open-source workbench built on DeepSeek Harness, with a native Codex execution
backend and planned WeChat, QQ, and Slack bot entry points.

基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的开源工作台。
通过 Codex CLI 执行开发任务，后续接入微信、QQ、Slack 管理项目、工作和网站。
这是独立社区项目，与 DeepSeek、OpenAI、腾讯和 Slack 没有隶属关系。

## 当前进度

| 能力 | 状态 |
| --- | --- |
| 本地 dsh Web、隔离运行数据 | 已实现 |
| 原生 Codex 会话后端 | 已接入，复用 Relay 插件 |
| 对话、文件读写、命令执行、连续追问 | 本机真实链路已验证 |
| 基础测试和 CI 配置 | 已实现；真实模型测试不在公共 CI 中执行 |
| 微信 / QQ / Slack 双向消息 | 待开发 |

## 快速开始

需要 Node.js 26 和 npm。克隆本仓库后，在仓库目录运行：

```sh
npm ci
npm run codex -- login
npm start
```

如果已在本机 Codex 登录，通常可以跳过登录步骤。插件复用 Codex 原生认证，
无需向 dsh 提供 DeepSeek API Key，也不复制 Codex 凭据。

打开终端打印的完整 URL，选择工作区，然后把 **Standard mode** 切换为 **Codex**。
确认模型选择器显示 Codex 模型后发送消息。新会话需在第一条消息前选好后端。
按 Ctrl+C 停止服务。

链路为：`dsh Web → Relay Codex backend → codex app-server → 工具执行 → dsh`。
Codex 是完整会话执行后端，不是由 DeepSeek 主模型委派的子 Agent。

## 本机 CLI 与网络配置

默认由插件自动发现本机 Codex；发现失败时使用其附带的官方 Codex CLI。
需要指定 CLI 或代理时，复制 `.env.example` 为 `.env`，填写本机配置：

```dotenv
RELAY_CODEX_COMMAND=/absolute/path/to/codex
```

含空格的路径用双引号包裹；Windows 也可在插件设置中填写可执行文件路径。
旧版 dsh 的原生目录选择器在部分宿主中不可用。可在 `.env` 设置
`WORKBENCH_WORKSPACE=/absolute/path/to/project`，重启后自动注册该工作区。
代理按你的网络环境配置，不要照搬其他机器的地址。`HTTPS_PROXY` / `HTTP_PROXY`
需要由终端导出，或写入 `.dsh-codex/.env`；dsh 会拒绝项目根目录 `.env` 中的代理变量。
`.env` 仅在本机保存，不提交到 Git。

## 版本与运行数据

- 兼容组合：dsh `0.1.6-alpha.1` + `relay-dsh-plugin-codex` `0.2.4`。
- 插件尚未声明支持 dsh 0.2，因此本项目没有继续使用最初的 `0.2.1-rc.2`。
- 完整 dsh 组件版本由 `package-lock.json` 固定；请使用 `npm ci`，不要删除锁文件。
- 可复现的插件组合保存在 `config/codex.patch.yml`，随 `npm start` 自动加载。
- 默认凭据、配置和会话保存在 `.dsh-codex/`；原先 `.dsh/` 的 0.2 数据不迁移、不覆盖。
- 可通过 `DSH_HOME` 指定其他数据目录；相对路径基于仓库根目录解析。
- `.dsh/`、`.dsh-codex/`、`node_modules/`、`.env` 和日志不进入 Git。

## 检查与扩展

```sh
npm test
npm run dsh -- --help
npm run codex -- --version
```

自动测试验证启动器、全新目录中的后端配置组合，以及 dsh 组件版本一致性。
真实模型验收在隔离目录进行，检查文件读写和同一会话的连续追问，不需要上传私人代码。

三个 IM 通道计划复用同一个 dsh 会话后端。详见 [ROADMAP.md](ROADMAP.md)
和 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

原创代码使用 [MIT](LICENSE)。
[Relay Codex 插件](https://github.com/yangbobo2021/relay-dsh-plugin-codex)、
DeepSeek Harness 和其他依赖保留各自许可证。
