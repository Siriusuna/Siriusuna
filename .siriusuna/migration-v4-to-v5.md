# Quartz 4.5.2 → 5 迁移记录

迁移日期:2026-09-15

## 这不是一次普通升级

Quartz 5 是架构重写:

- **配置格式**:`quartz.config.ts` + `quartz.layout.ts`(已删除)→ `quartz.config.yaml` + `quartz.ts`
- **插件体系**:几乎所有内置插件和组件(Explorer / Graph / Search / Darkmode / ContentMeta /
  Footer / OFM / Latex …)被移出核心,变成 `@quartz-community/*` npm 包
- **布局**:不再有 layout 文件,组件位置变成 `quartz.config.yaml` 里每个插件条目的 `layout:` 属性
- **URL**:全部小写化(见下)

因为旧仓库与上游无共同历史,迁移方式是**从 `upstream/v5` 新建 `v5` 分支再移植改动**,
而不是 merge。`siriusuna`(v4)分支原封不动保留。

## URL 变化(重要)

### 小写化:已自动兼容

v5 把所有 URL 转成小写。**空格转连字符不是新行为**——v4 的 `sluggify()` 已经在做了,
所以唯一的增量就是大小写。

`@quartz-community/alias-redirects`(默认启用)会在**与 v4 完全相同的老 URL 上**生成重定向页,
带 `<link rel="canonical">`、`<meta http-equiv="refresh">` 和 `noindex`,搜索引擎权重会转移过去。

实测:**225 个旧 URL 中 222 个可正常访问**。

### 3 个 URL 真的变了

v5 的 `slugifyFilePath` 新增了文件夹笔记约定:**文件名与父文件夹同名时,该文件变成文件夹索引页**
(`@quartz-community/utils/dist/path.js`)。受影响的正好 3 个文件:

| v4 URL                    | v5 URL                |
| ------------------------- | --------------------- |
| `/公开课/CS169/Ruby/Ruby` | `/公开课/cs169/ruby/` |
| `/公开课/CS61A/SQL/SQL`   | `/公开课/cs61a/sql/`  |
| `/公开课/CS61B/Java/Java` | `/公开课/cs61b/java/` |

**内容没有丢失**,正文被合并进了对应的文件夹索引页(同时带上该文件夹的页面列表)。
但老地址不会被 alias-redirects 覆盖(它只处理大小写),会 404。

**如果需要保住这 3 个老链接**:在这 3 个 md 文件的 frontmatter 里加 aliases,例如

```yaml
aliases:
  - 公开课/CS61B/Java/Java
```

注意这几个文件在 **`content` submodule(`Siriusuna/Notes`)里**,是另一个仓库,
要在那边提交。目前**尚未处理**。

## 验证记录

```
构建            225 个 md → 2002 个文件,无报错、无插件警告
旧 URL 兼容     222 / 225
Waline          容器与 server URL 正确注入 afterBody
ViewImage       脚本注入,已改为 nav 事件(修掉 SPA 失效)
ContentMeta     ✏️/🔧/📄 三日期正常渲染
RecentNotes     首页/介绍页显示,普通笔记页不显示
背景图/字体      编译进 index-*.css,woff2 已产出到 /static/fonts/
友链页          自带的 <style> 块正常保留
插件构建        确定性(连续两次构建产物一致)
```

## 待办

- [ ] 本地 `npx quartz build --serve` 目视过一遍(尤其暗色模式、移动端布局)
- [ ] push `v5` 分支,确认 CI 构建通过、submodule 正常拉取
- [ ] 决定是否给上面那 3 个文件加 aliases
- [ ] 确认无误后:
  1. 在 `.github/workflows/deploy.yml` 里加回 `deploy` job(见下)
  2. GitHub → Settings → General → Default branch 改成 `v5`
  3. 确认 Notes 仓库的 `repository_dispatch` 仍能触发(workflow 已保留该触发器)

### 切换时要加回的 deploy job

追加到 `.github/workflows/deploy.yml` 现有 `build` job 之后(与 `build` 同级):

```yaml
jobs:
  # ... 现有的 build job 保持不变 ...

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

同时把文件顶部那段「Migration phase」注释删掉。

## 回退

`siriusuna` 分支是完整的 v4 站点,没有任何改动。把默认分支改回 `siriusuna` 即可恢复。

## v4 → v5 配置对照

| v4                                                           | v5                                                        |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| `Plugin.FrontMatter()`                                       | `@quartz-community/note-properties`                       |
| `Plugin.CreatedModifiedDate()`                               | `@quartz-community/created-modified-date`                 |
| `Plugin.SyntaxHighlighting()`                                | `@quartz-community/syntax-highlighting`                   |
| `Plugin.ObsidianFlavoredMarkdown()`                          | `@quartz-community/obsidian-flavored-markdown`            |
| `Plugin.GitHubFlavoredMarkdown()`                            | `@quartz-community/github-flavored-markdown`              |
| `Plugin.TableOfContents()`                                   | `@quartz-community/table-of-contents`                     |
| `Plugin.CrawlLinks()`                                        | `@quartz-community/crawl-links`                           |
| `Plugin.Description()`                                       | `@quartz-community/description`                           |
| `Plugin.Latex()`                                             | `@quartz-community/latex`                                 |
| `Plugin.ViewImage()`                                         | `./plugins/sirius-view-image`                             |
| `Plugin.RemoveDrafts()`                                      | `@quartz-community/remove-draft`                          |
| `Plugin.AliasRedirects()`                                    | `@quartz-community/alias-redirects`                       |
| `Plugin.ContentIndex()`                                      | `@quartz-community/content-index`                         |
| `Plugin.Favicon()`                                           | `@quartz-community/favicon`                               |
| `Plugin.ContentPage/FolderPage/TagPage()`                    | `@quartz-community/{content,folder,tag}-page`             |
| `Plugin.NotFoundPage()`                                      | 核心内置 pageType,无需配置                                |
| `Plugin.ComponentResources/Assets/Static()`                  | 核心内置 emitter,无需配置                                 |
| `Component.Flex({Search, Darkmode, ReaderMode})`             | `layout.group: toolbar` + 顶层 `layout.groups.toolbar`    |
| `Component.ConditionalRender({condition: slug !== "index"})` | `layout.condition: not-index`(内置)                       |
| RecentNotes 的标签条件                                       | `quartz.ts` 里 `registerCondition("sirius-landing-page")` |
| `defaultContentPageLayout` / `defaultListPageLayout` 的差异  | `layout.byPageType.{folder,tag}`                          |
| `Component.WalineComment()`                                  | `./plugins/sirius-waline`                                 |
| `Component.Friends()` / `Component.SpotifyPlayer()`          | 已丢弃                                                    |
