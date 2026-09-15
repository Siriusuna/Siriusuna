# 魔改清单

本站相对上游 Quartz 5 的全部差异。改动之后请同步更新本文件。

---

## 本地插件

都在 `plugins/` 下,在 `quartz.config.yaml` 里用相对路径引用(如 `./plugins/sirius-waline`)。
Quartz 会把它们 **symlink** 到 `.quartz/plugins/`,并直接使用各自**已提交的 `dist/`**。

> ⚠️ **改了任何 `plugins/*/src/` 之后,必须跑 `npm run build:plugins` 并把 `dist/` 一起提交。**
> 否则构建用的还是旧代码。CI 里有一步会重新构建并对比 `dist/`,不一致就直接失败。

### `sirius-waline` — Waline 评论

- **为什么是本地插件**:社区只有 giscus 的 `@quartz-community/comments`,没有 Waline 的。
- **来源**:移植自 v4 的 `quartz/components/WalineComment.tsx` + `scripts/waline.inline.ts`。
- **位置**:`afterBody`,priority 10。
- **行为**:笔记 frontmatter 写 `comments: false` 可单页关闭;暗色模式跟随 `html[saved-theme="dark"]`;
  SPA 切页时销毁旧实例(`window.addCleanup`)防止重复。
- **依赖**:Waline client v3 从 unpkg 运行时加载(`tsup.base.ts` 把 `https://` import 标记为
  external 就是为了这个,不要去掉)。
- **服务端**:`https://waline.siriusuna.top`,配置在 `quartz.config.yaml` 的 options 里。

### `sirius-view-image` — 图片灯箱

- **为什么是本地插件**:社区没有对应插件。
- **来源**:v4 的 `quartz/plugins/transformers/viewImage.ts`,原始代码来自上游 PR #2074(@jxlenco,MIT)。
- **移植时修掉的 bug**:v4 用 `DOMContentLoaded` 初始化,只在首屏绑定一次,**SPA 切页后灯箱就失效了**。
  现在改用 Quartz 的 `nav` 事件,每次导航都重新初始化。
- **顺带去掉**:v4 遗留的 `border: 2px dashed #284b63` 调试边框。

### `sirius-site-assets` — 外部字体与脚本

- **为什么是本地插件**:v4 是直接改 `quartz/components/Head.tsx` 注入的,那是冲突重灾区。
  现在通过 transformer 的 `externalResources().additionalHead` 提供,核心零修改。
- **提供**:LXGW WenKai Screen(cdnjs)、Maple Mono NF CN(ZeoSeven #442)、
  Monsieur La Doulaise(Google Fonts,给 `.content-meta` 用),以及相关 preconnect。
- **两个默认关闭的开关**:
  - `enableAPlayer`(默认 `false`)—— v4 每个页面都加载 APlayer 的 CSS+JS,但全站内容里
    **没有任何一处真的创建播放器实例**。要用回来就设成 `true`。
  - `enableFiraCode`(默认 `false`)—— 代码字体已经换成 Maple Mono NF CN,Fira Code 是遗留的。

### `sirius-content-meta` — 三日期显示

- **为什么是 fork**:上游 `@quartz-community/content-meta` 只有 `showReadingTime` / `showComma`
  两个选项,只能显示**一个**日期(由 `defaultDateType` 决定)。
- **行为**:并排显示 ✏️ 创建 / 🔧 修改 / 📄 发布 三个日期 + 阅读时长,沿用 v4 的样子。
- **相对 v4 的改进**:每个日期**存在才渲染**。v4 是三个无条件 push,笔记缺 `published` 时会对
  `undefined` 调用 `.toISOString()`。
- 上游那个在 `quartz.config.yaml` 里显式 `enabled: false`。

### `sirius-recent-notes` — 最近笔记(带过滤)

- **为什么是 wrapper**:v4 在 `quartz.layout.ts` 里给 RecentNotes 传了一个 `filter` **函数**,
  把首页/介绍类页面本身从列表里排除。YAML 表达不了函数,上游插件的 optionSchema 也没有这个选项。
  于是这里把它变成 YAML 能承载的**标签名数组** `excludeTags`。
- **只包装不重写**:`@quartz-community/recent-notes` 在 `tsup.config.ts` 里被标记为 external,
  用的是根目录 node_modules 里的那一份,没有重复打包。
- **配套**:v4 行为的另一半(只在首页/介绍页显示)靠 `quartz.ts` 里注册的
  `sirius-landing-page` 布局条件实现。

---

## 核心文件改动(唯一一处)

### `quartz.ts`

注册了自定义布局条件 `sirius-landing-page`(页面 tags 含「主页」或「介绍」)。

`quartz.config.yaml` 的 `condition:` 只接受**名字**不接受函数,内置的只有 `not-index` /
`has-tags` / `has-backlinks` / `has-toc`,所以自定义条件必须在这里先注册,且必须在
`loadQuartzLayout()` 之前执行。

上游的 `quartz.ts` 只有 5 行,升级时如果冲突,把 `registerCondition` 那段重新放回去即可。

---

## 样式与静态资源

### `quartz/styles/custom.scss`

上游约定的用户样式文件,内容:

- 三个自托管字体的 `@font-face`:QiushuiShotai(正文)、LXGWWenKaiMonoTC-Bold(充当秋水书体的粗体)、
  Tekitou(歌词页 `.lyrics` 用)
- `--custom-highlight` / `--border-radius`
- 行内 `code` 与 `pre` 的配色
- `.content-meta` 用 Monsieur La Doulaise 手写体
- `body` 背景图(`ToriNoUta.jpg`)+ 一层随主题变化的半透明遮罩
- `.page article` / `.page-listing` 的半透明卡片,让背景图透出来
- **`html` 移动端 `scroll-padding-top: 0`** —— v4 是直接把这条规则从 `base.scss` 里删掉的,
  现在改成在这里覆盖,核心文件保持原样

### `quartz/static/`

| 文件                                       | 用途                                            |
| ------------------------------------------ | ----------------------------------------------- |
| `fonts/QiushuiShotai.woff2` (9.5M)         | 正文字体                                        |
| `fonts/LXGWWenKaiMonoTC-Bold.woff2` (5.2M) | 秋水书体的粗体替身                              |
| `fonts/TekitouPoem.woff2` (3.0M)           | 歌词页字体                                      |
| `images/ToriNoUta.jpg`                     | 全站背景图,被 `custom.scss` 引用                |
| `images/Isekaijoutyo-siriusunosinzou.jpg`  | `content/index.md` 引用                         |
| `avatars/Siriusuna.png`                    | `content/about.md` 与 `content/friends.md` 引用 |

> 这些都是**内容或样式在引用**的资源。删任何一个之前,先
> `grep -rn "/static/" content/` 确认没人用。

---

## 配置上偏离上游默认值的地方

`quartz.config.yaml` 里每条都有注释,这里只列需要留意的:

| 项                                                                  | 设置    | 原因                                                                                |
| ------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `note-properties.hidePropertiesView`                                | `true`  | 上游默认会在正文上方渲染一个属性表格,v4 没有这东西                                  |
| `og-image`                                                          | `false` | v4 就注释掉了,为了构建速度                                                          |
| `cname`                                                             | `false` | 自定义域名配在仓库 Pages 设置里,不需要产出 CNAME 文件                               |
| `canvas-page` / `bases-page` / `encrypted-pages` / `unlisted-pages` | `false` | 上游默认开,但本站内容用不到,关掉减少表面积                                          |
| `theme.fontOrigin`                                                  | `local` | 字体由 `custom.scss` 和 `sirius-site-assets` 提供,不要让 Quartz 再注入 Google Fonts |

## 已丢弃的 v4 魔改

| 组件                                      | 说明                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Friends.tsx` + `static/data/friends.yml` | 友链页 `content/friends.md` **自带完整 `<style>` 块**,用 `!important` 全量覆盖,不依赖这个组件的任何 CSS,所以整个组件可以安全删掉 |
| `SpotifyPlayer.tsx`                       | v4 的 layout 里本来就是注释状态                                                                                                  |

## 构建期依赖

根 `package.json` 的 devDependencies 里加了三个,**只服务于 `plugins/` 的构建**,不进站点产物:

- `tsup` —— 打包本地插件
- `sass` —— `tsup.base.ts` 里编译插件内的 `.scss`
- `reading-time` —— `sirius-content-meta` 用;上游把它打包进自己的 dist 了,根目录没有
