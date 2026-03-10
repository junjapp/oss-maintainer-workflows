# oss-maintainer-workflows

一个面向开源维护者的可复用工作流工具包。

## 这个仓库解决什么问题

很多开源仓库真正缺的不是新功能，而是稳定、清晰、可重复的维护流程：

- issue 接入与分流
- PR 审查约束
- release 检查与发布说明
- 贡献者文档与协作边界
- 仓库归属、治理规则与基础协作约定

这个仓库不是业务应用模板，而是仓库运维与维护模板。

## 适合谁使用

- 独立维护公开仓库的个人开发者
- 需要轻量维护流程的小型 OSS 团队
- 希望把维护方式公开化、标准化、可复用的项目

## 不适合谁使用

- 私有或闭源仓库
- 只想要业务应用脚手架的项目
- 不希望公开维护流程与贡献规则的团队

## 已包含内容

- 根目录公开文档：
  - `README.md`
  - `README.zh-CN.md`
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
- 仓库工作流资产：
  - `.github/ISSUE_TEMPLATE/*.yml`
  - `.github/pull_request_template.md`
  - `.github/CODEOWNERS`
  - `.github/workflows/*.yml`
- 公开说明文档：
  - `docs/project-roadmap.md`
  - `docs/release-playbook.md`
  - `docs/maintenance-cadence.md`
- 最小示例目录：
  - `examples/basic-template/README.md`

## 推荐使用方式

1. 把这个仓库单独公开出来，或者把它设成 GitHub Template Repository。
2. 先跑：

```bash
npm test
npm run validate:repo
```

3. 按真实项目重写首页、`CODEOWNERS` 和部分说明文档。
4. 把 issue 处理、发布说明、贡献入口和示例目录逐步对齐到真实项目。
5. 保持文档、模板和仓库实际行为一致。

## 常见调整项

- 用真实项目定位替换通用仓库说明
- 检查 issue 模板，删掉你的仓库不会维护的部分
- 确认 `CODEOWNERS`、`SECURITY.md` 和发布说明对应真实维护者
- 让 roadmap 保持简短，只保留近期真的会做的事项
- 删掉和当前仓库范围不一致的示例或模板内容

## 这个仓库带来的直接收益

- issue、PR、release 流程更容易保持一致
- 贡献者更容易理解仓库如何协作
- 文档与模板更容易长期维护
- 新维护者接手时不需要先猜规则
