# Siriusuna 站点工作文档

这个目录放的是**本站特有**的维护文档。上游 Quartz 没有 `.siriusuna/` 这个路径,所以
`npx quartz upgrade` 永远不会碰到它、也不会产生冲突。

| 文档                                           | 内容                                              |
| ---------------------------------------------- | ------------------------------------------------- |
| [customizations.md](customizations.md)         | 魔改清单:改了什么、在哪、为什么、动了之后要做什么 |
| [upstream-sync.md](upstream-sync.md)           | 同步上游的标准流程,以及冲突怎么处理               |
| [migration-v4-to-v5.md](migration-v4-to-v5.md) | 本次 Quartz 4 → 5 迁移的记录、取舍和遗留事项      |

## 最重要的一条规则

**不要改 `quartz/` 目录里的任何文件。**

Quartz 4 时期的魔改是直接改核心文件的(`Head.tsx`、`ContentMeta.tsx`、`renderPage.tsx`……),
这正是每次想同步上游都会满屏冲突的原因。v5 迁移后,所有个性化都搬到了四个上游不会动的位置:

```
quartz.config.yaml      站点配置、插件开关与选项、布局位置
quartz.ts               YAML 表达不了的东西(目前:自定义布局条件)
plugins/sirius-*/       本地插件,魔改的载体
quartz/styles/custom.scss + quartz/static/   上游约定的用户可写区
```

唯一的例外见 [customizations.md](customizations.md) 里「核心文件改动」一节,目前只有 1 处。

## 常用命令

```bash
npm ci                                  # 装依赖
npm run build:plugins                   # 重新构建 plugins/ 下所有本地插件(改了 src 必做)
npx quartz plugin install --from-config # 按 quartz.config.yaml 链接/安装插件
npx quartz build                        # 构建到 public/
npx quartz build --serve                # 本地预览
```

第一次在一台新机器上跑,或者刚改完 `quartz.config.yaml` 的插件列表:

```bash
npm ci && npm run build:plugins && npx quartz plugin install --from-config && npx quartz build
```
