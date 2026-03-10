# 发布操作说明

## `v0.1.0`

首个公开版本的目标不是“功能很多”，而是“结构稳定、说明清楚、可以持续维护”。

发布前检查：

1. 运行 `npm test`
2. 运行 `npm run validate:repo`
3. 检查 `CHANGELOG.md`
4. 检查 README、Issue 模板、PR 模板是否与当前仓库一致
5. 确认 `CODEOWNERS`、`SECURITY.md` 没有占位内容

发布后动作：

1. 创建 GitHub Release
2. 开一个跟进 issue，记录 `v0.1.x` 需要补的文档、模板或流程调整
3. 分批提交后续改进，不要把所有变化都塞进首发版本
