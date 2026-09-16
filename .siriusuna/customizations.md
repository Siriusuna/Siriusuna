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
- **提供**:Jigmo(ZeoSeven #881,CJK 兜底)、Maple Mono NF CN(ZeoSeven #442,代码块里的
  中日文)、Monsieur La Doulaise(Google Fonts,给 `.content-meta` 用),以及相关 preconnect。
- **两个默认关闭的开关**:
  - `enableAPlayer`(默认 `false`)—— v4 每个页面都加载 APlayer 的 CSS+JS,但全站内容里
    **没有任何一处真的创建播放器实例**。要用回来就设成 `true`。
  - `enableFiraCode`(默认 `false`)—— 代码字体是 Monaspace,Fira Code 是遗留的。

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

- 自托管字体的 `@font-face`:Alegreya(西文正文/标题,可变字重)、Monaspace 四路(代码)、
  Tekitou(歌词页 `.lyrics` 用)
- `@use "./fonts-cjk.scss"` —— 四路 CJK 的 `@font-face`,由 `npm run build:fonts` 生成
- `--titleFont` / `--headerFont` / `--bodyFont` / `--codeFont` 的完整回退栈
- 代码块的 `font-feature-settings`(Monaspace 的 OpenType 特性)
- `--custom-highlight` / `--border-radius`
- 行内 `code` 与 `pre` 的配色
- `.content-meta` 用 Monsieur La Doulaise 手写体
- `body` 背景图(`torinouta.jpg`)+ 一层随主题变化的半透明遮罩
- `.page article` / `.page-listing` 的半透明卡片,让背景图透出来
- **`html` 移动端 `scroll-padding-top: 0`** —— v4 是直接把这条规则从 `base.scss` 里删掉的,
  现在改成在这里覆盖,核心文件保持原样

### `quartz/static/`

| 文件                                      | 用途                                            |
| ----------------------------------------- | ----------------------------------------------- |
| `fonts/alegreya-vf-*.woff2` (4 × ~40K)    | 西文正文与标题,latin / latin-ext × 正体 / 斜体  |
| `fonts/monaspace-*-nf-*.woff2` (4 × 1.3M) | 代码字体四路,Nerd Font 版本                     |
| `fonts/cjk/**` (830 个切片,31M)           | 四路 CJK,**由 `npm run build:fonts` 生成**      |
| `fonts/TekitouPoem.woff2` (3.0M)          | 歌词页字体                                      |
| `images/torinouta.jpg`                    | 全站背景图,被 `custom.scss` 引用                |
| `images/isekaijoutyo-siriusunosinzou.jpg` | `content/index.md` 引用                         |
| `avatars/siriusuna.png`                   | `content/about.md` 与 `content/friends.md` 引用 |

> 这些都是**内容或样式在引用**的资源。删任何一个之前,先
> `grep -rn "/static/" content/` 确认没人用。新增资源请用小写文件名,原因见下。

---

## 配置上偏离上游默认值的地方

`quartz.config.yaml` 里每条都有注释,这里只列需要留意的:

| 项                                                                  | 设置    | 原因                                                                                |
| ------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `quartz-fonts`                                                      | `false` | **见下方「字体为什么不能开 quartz-fonts」**,开着会覆盖全站字体                      |
| `@quartz-themes/core`                                               | `false` | 预设配色主题(默认 tokyo-night),启用会接管 `theme.colors`。上游默认也是关的          |
| `note-properties.hidePropertiesView`                                | `true`  | 上游默认会在正文上方渲染一个属性表格,v4 没有这东西                                  |
| `og-image`                                                          | `false` | v4 就注释掉了,为了构建速度                                                          |
| `cname`                                                             | `false` | 自定义域名配在仓库 Pages 设置里,不需要产出 CNAME 文件                               |
| `canvas-page` / `bases-page` / `encrypted-pages` / `unlisted-pages` | `false` | 上游默认开,但本站内容用不到,关掉减少表面积                                          |
| `theme.fontOrigin`                                                  | `local` | 字体由 `custom.scss` 和 `sirius-site-assets` 提供,不要让 Quartz 再注入 Google Fonts |

### 字体为什么不能开 `quartz-fonts`

`@quartz-community/quartz-fonts` 的 `useThemeFonts` 选项读的是**主题插件
(`@quartz-themes/core`)提供的字体注册表**,而**不是** `quartz.config.yaml` 里的
`configuration.theme.typography`。

本站(以及上游自己的默认配置)没有安装主题,于是该插件回退到它硬编码的一套默认字体,
并产出:

```css
@layer quartz-fonts {
  :root {
    --bodyFont: Source Sans Pro;
    --headerFont: Schibsted Grotesk;
    --codeFont: IBM Plex Mono;
  }
}
```

这份样式表排在核心样式表**之后**,于是把 `theme.typography` 配的字体全部覆盖掉,
同时还会从 Google Fonts 拉三套没人用的字体。

> 这实际上是个上游 bug:上游默认的 `theme.typography` 恰好**就等于**那套硬编码字体,
> 所以它自己不会发现;**任何人改了 typography 都会踩到**。
>
> 如果哪天要启用 `@quartz-themes/core`,再一并重新评估这个插件。

字体现在的来源:

- 自托管:`custom.scss` 的 `@font-face`(Alegreya / Monaspace / Tekitou)+ 生成的
  `fonts-cjk.scss`(四路 CJK 切片)
- CDN:`sirius-site-assets` 插件(Jigmo / Maple Mono NF CN / Monsieur La Doulaise)
- `--titleFont` / `--headerFont` / `--bodyFont` / `--codeFont` 由 `custom.scss` 覆盖,
  **不是**由 Quartz 核心从 `theme.typography` 生成的那一份(原因见下)

---

## 字体体系

移植自 siriusuna 的 WezTerm `font_rules` 配置:**一个 family 名下挂四个物理字体,
浏览器按 weight/style 自动分流**。CSS 原生支持这件事 —— 几条共用 family 名、只有
`font-weight` / `font-style` 描述符不同的 `@font-face` —— 所以不需要 JS,也不需要给元素加 class。

| weight / style | 西文正文        | 代码(Monaspace)   | CJK(SiriusCJK)      | WezTerm 对应         |
| -------------- | --------------- | ----------------- | ------------------- | -------------------- |
| 400 normal     | Alegreya        | Argon             | GenRyuMin2 TC R     | 默认 / kanji_regular |
| 700 normal     | Alegreya        | Xenon Bold        | GenRyuMin2 TC B     | intensity=Bold       |
| 400 italic     | Alegreya Italic | Neon Italic       | LXGW WenKai Mono NF | italic=true          |
| 700 italic     | Alegreya Italic | Radon Bold Italic | Yozai Bold          | Bold + italic        |

回退栈:`"Alegreya", "SiriusCJK", "Jigmo", Georgia, serif`。Alegreya 只有西文,CJK 逐字形
落到 SiriusCJK;SiriusCJK 只覆盖 BMP 汉字区,更罕见的字落到 Jigmo(CDN,覆盖 Ext A–I)。

### 几个容易被当成 bug 改掉的地方

- **两个「斜体」CJK face 本身是直立字体。** 把 LXGW WenKai Mono 和 Yozai 声明成
  `font-style: italic`,浏览器就会用它们替代斜体**而不做倾斜** —— WezTerm 就是这么干的。
  不要加 oblique 变换,也不要让 `font-synthesis` 插进来。
- **`dlig` 不在 feature 列表里。** Monaspace 根本没有这个 feature,WezTerm 配置里那一项
  在终端里也是空转。已对 v1.400 核实;其余(`calt` / `liga` / `ss01`–`ss10` / `cv31` /
  `cv32` / `cv62`)在 Nerd Font 构建里都在。`calt` 驱动 Monaspace 的 texture healing,必须保留。
- **字体栈必须写在 `custom.scss`,不能写在 `quartz.config.yaml`。** 核心把 typography 的值
  整个套引号输出(`--bodyFont: "${name}", sans-serif`),YAML 里写逗号分隔的回退栈会变成
  一个引号字符串,永远解析不了。YAML 里只留每个角色的首选 family。
- **上游 Monaspace v1.400 的 `MonaspaceNeonNF-Italic.woff2` 有打包 bug**:legacy name
  ID 1/4/6 写成了 "Monaspace Krypton Var"(name 16/17 和 italicAngle 都是对的)。
  自托管无所谓 —— 浏览器用的是我们声明的 family 名;装到桌面端才会踩到。

### `npm run build:fonts`

两步:`scripts/prepare-cjk-sources.py`(从 `.ttc` 里抽出 TC face,裁到 BMP 汉字区)+
`scripts/build-fonts.mjs`(cn-font-split 按 unicode-range 切片,生成 `fonts-cjk.scss`)。

需要 `.fonts-src/` 里的桌面字体源(约 100MB,已 gitignore,**不在仓库里**)和
`pip install 'fonttools[woff]'`。产物 `quartz/static/fonts/cjk/**` 和 `fonts-cjk.scss`
**是提交进仓库的**,所以日常构建不需要跑这一步 —— 只有换字体或补字时才跑。

字符集定义在 `prepare-cjk-sources.py` 的 `UNICODES`:BMP 汉字区 + 假名 + 标点 + 西文,
**不含** CJK Ext A/B+(笔记目前一个都没用到)和 Nerd Font 私用区(图标由代码字体 Monaspace 提供)。

切片粒度定在 70KB,是实测出来的:200KB 和 300KB 虽然总体积更小,但单页下载中位数分别涨到
409KB 和 4355KB(70KB 是 361KB)。本站内容字符离散度高,大分片的局部性很差。

> **代价**:全量 830 个切片共 31MB,比不切片的整体积大 58%(woff2 压缩整份字体时能跨字形
> 共享冗余,切开后各压各的)。单页中位 361KB、p90 2.2MB;读者翻的页越多,累计下载越逼近
> 7MB/字重。这是明知代价后选的方案,不是疏漏。

---

## 静态资源必须用小写文件名

**规则:任何会被笔记正文引用的 `quartz/static/` 资源,文件名必须全小写。**

原因:v5 的 CrawlLinks 会把笔记里的 URL 路径**小写化**,但核心的 `Static` emitter 是
**原样复制** `quartz/static/**`、不改文件名。所以 `Foo.jpg` 在 HTML 里会变成
`./static/foo.jpg`,在大小写敏感的主机(GitHub Pages)上直接 404 —— 而且**构建不会报任何警告**。

迁移刚上线时就踩了这个坑。现在由 `.siriusuna/check-static-refs.mjs` 兜底,CI 每次构建后
都会扫描产物里所有 `/static/` 引用,有一个解析不到就直接失败:

```bash
npx quartz build && node .siriusuna/check-static-refs.mjs
```

该脚本除了 HTML 的 `src` / `href`,**也扫样式表里的 `url()`** —— 字体全靠 CSS 引用,
而 `fonts-cjk.scss` 是生成的、带着 800 多条路径,写错一条会静默 404,没有别的信号。

`fonts/` 目录下 `TekitouPoem.woff2` 仍是混合大小写(它只被 `custom.scss` 引用,CSS 的
`url()` 不会被 CrawlLinks 重写,所以无害)。本次新增的字体一律用小写文件名。

## 已丢弃的 v4 魔改

| 组件                                      | 说明                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Friends.tsx` + `static/data/friends.yml` | 友链页 `content/friends.md` **自带完整 `<style>` 块**,用 `!important` 全量覆盖,不依赖这个组件的任何 CSS,所以整个组件可以安全删掉 |
| `SpotifyPlayer.tsx`                       | v4 的 layout 里本来就是注释状态                                                                                                  |

## 构建期依赖

根 `package.json` 的 devDependencies 里加了四个,**只服务于构建**,不进站点产物:

- `tsup` —— 打包本地插件
- `sass` —— `tsup.base.ts` 里编译插件内的 `.scss`
- `reading-time` —— `sirius-content-meta` 用;上游把它打包进自己的 dist 了,根目录没有
- `cn-font-split` —— `npm run build:fonts` 用,按 unicode-range 切片 CJK 字体。
  只在换字体时跑,日常构建用不到(切片产物是提交进仓库的)
