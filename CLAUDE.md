# CLAUDE.md

Quartz 5 搭建的数字花园,部署在 GitHub Pages(siriusuna.top)。
正文内容不在本仓库,而是 `content/` submodule(`Siriusuna/Notes`),CI 构建时拉取。

分支:`siriusuna` 是线上分支;`siriusuna-v4` 是迁移前的 Quartz 4 存档,不要动。
上游 `upstream` = `jackyzha0/quartz`(push 地址已故意置为无效值)。

详细文档在 `.siriusuna/`:[魔改清单](.siriusuna/customizations.md)、
[同步上游](.siriusuna/upstream-sync.md)、[迁移记录](.siriusuna/migration-v4-to-v5.md)。
**改了任何魔改,同步更新 `customizations.md`。**

---

## 三条硬性规则

### 1. 不要改 `quartz/` 里的文件

Quartz 4 时期魔改直接改核心文件,导致完全没法同步上游。v5 迁移后个性化只放这四处:

| 位置                                           | 用途                               |
| ---------------------------------------------- | ---------------------------------- |
| `quartz.config.yaml`                           | 站点配置、插件开关与选项、布局位置 |
| `quartz.ts`                                    | YAML 表达不了的东西(自定义条件)    |
| `plugins/sirius-*/`                            | 本地插件,魔改的载体                |
| `quartz/styles/custom.scss` + `quartz/static/` | 上游约定的用户可写区               |

例外只有 `quartz.ts`(注册 `sirius-landing-page` 布局条件)。要加新功能时,
先问"能不能做成本地插件",而不是去改核心。

### 2. 改了 `plugins/*/src/` 必须重新构建并提交 `dist/`

Quartz 把本地插件 symlink 到 `.quartz/plugins/`,直接用**已提交的 `dist/`**。
不重新构建,站点用的就是旧代码。

```bash
npm run build:plugins   # 然后把 dist/ 一起提交
```

CI 会重新构建并对比 `dist/`,不一致直接失败。

### 3. `quartz/static/` 下被笔记引用的资源,文件名必须全小写

CrawlLinks 会把笔记里的 URL 小写化,但 `Static` emitter 原样复制文件名,
所以 `Foo.jpg` 会变成 `./static/foo.jpg` 然后 404,**构建不报任何警告**。

`fonts/` 是例外(只被 CSS 引用,CSS 的 `url()` 不会被重写),保持现状即可 ——
那三个 woff2 共 18MB,改名会在历史里多留一份,而 CI 用 `fetch-depth: 0`。

---

## 常用命令

```bash
npm ci
npm run build:plugins                     # 改过 plugins/*/src 后必做
npx quartz plugin install --from-config   # 改过 config 的插件列表后必做
npx quartz build
npx quartz build --serve                  # 本地预览
```

改完之后跑完整验证:

```bash
npm run build:plugins && npx quartz build \
  && node .siriusuna/check-static-refs.mjs \
  && npx tsc --noEmit && npx prettier . --check
```

## 本地插件

| 插件                  | 类型        | 做什么                         |
| --------------------- | ----------- | ------------------------------ |
| `sirius-waline`       | component   | Waline 评论(afterBody)         |
| `sirius-view-image`   | transformer | 图片灯箱,在 `nav` 事件上初始化 |
| `sirius-site-assets`  | transformer | 字体等外部资源注入 `<head>`    |
| `sirius-content-meta` | component   | 三日期 emoji 显示,fork 自上游  |
| `sirius-recent-notes` | component   | 包装上游插件,加标签过滤        |

写新插件时照着现有的抄:`package.json` 里的 `quartz` manifest 块 + 继承
`plugins/tsup.base.ts` 的三行 `tsup.config.ts`。

两个容易踩的坑:

- **transformer 必须实现 `textTransform` / `markdownPlugins` / `htmlPlugins` 至少一个**,
  否则 `validateCategory()` 会**静默跳过**整个插件。只提供 `externalResources` 的插件
  要加一个空的 `markdownPlugins()`。
- **一个 YAML 插件条目只能定位一个组件**,所以需要放在不同位置的组件必须拆成不同插件。

## 已知的上游坑

- **`@quartz-community/quartz-fonts` 必须保持禁用。** 它的 `useThemeFonts` 读的是主题插件
  (`@quartz-themes/core`)的字体注册表,**不是** `theme.typography`。没装主题时它回退到
  上游硬编码字体,并在 `@layer quartz-fonts` 里覆盖掉全站字体。上游自己不会发现,
  因为它的默认 typography 恰好等于那套回退值。
- **`@quartz-themes/core` 保持禁用**(上游默认也是关的)。它是预设配色主题,
  启用会接管 `theme.colors`,覆盖现有配色。
- **`Folder/Folder.md` 会变成文件夹索引页**(v5 新增的约定),URL 从
  `/folder/folder` 变成 `/folder/`。

## 边界

- **`content/` 是另一个仓库。** 改那里的文件前先问,push 会触发 `repository_dispatch`
  自动重新部署线上站点。`.prettierignore` 已排除 `content`,不要用 prettier 格式化笔记。
- **不要删上游自带的 workflow**(`ci.yaml`、`docker-build-push.yaml` 等)。它们都带
  `if: github.repository == 'jackyzha0/quartz'` 守卫,在 fork 里会自动跳过;删掉的话
  上游每次改动都会产生 "deleted by us" 冲突。
- `quartz.lock.json` 已 gitignore —— 对本地路径插件它只记录本机绝对路径和时间戳。
