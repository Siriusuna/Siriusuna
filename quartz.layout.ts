import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "Siriusuna/Siriusuna",
        repoId: "R_kgDOQmO3Qw",
        category: "Announcements",
        categoryId: "DIC_kwDOQmO3Q84Czr7z",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      "GitHub@Siriusuna": "https://github.com/Siriusuna",
      "X@Salieri1122": "https://x.com/Salieri1122",
      "Mail@Siriusuna": "mailto:Siriusuna@outlook.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(
      Component.ConditionalRender({
        condition: (page) => {
          const tags = page.fileData.frontmatter?.tags ?? []
          return tags.some(
            (tag: string) => tag.toLowerCase() === "主页" || tag.toLowerCase() === "介绍",
          )
        },
        component: Component.DesktopOnly(
          Component.RecentNotes({
            limit: 2,
            filter(f) {
              const tags = f.frontmatter?.tags ?? []
              const excludedTags = new Set(["主页", "介绍"])
              for (const tag of tags) {
                if (excludedTags.has(tag.toLowerCase())) {
                  return false
                }
              }
              return true
            },
          }),
        ),
      }),
    ),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    // Component.SpotifyPlayer(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    // Component.Friends(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
