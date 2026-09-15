import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

/**
 * Layout conditions that quartz.config.yaml cannot express.
 *
 * `condition:` in the YAML takes a name, not a predicate, so anything beyond the built-ins
 * (not-index, has-tags, has-backlinks, has-toc) has to be registered here first. This must
 * run before loadQuartzLayout() resolves the YAML.
 *
 * sirius-landing-page reproduces the ConditionalRender wrapper that Quartz 4 used in
 * quartz.layout.ts to show Recent Notes only on the landing pages.
 */
const LANDING_PAGE_TAGS = new Set(["主页", "介绍"])

registerCondition("sirius-landing-page", (props) => {
  const tags = (props.fileData.frontmatter?.tags ?? []) as string[]
  return tags.some((tag) => LANDING_PAGE_TAGS.has(String(tag).toLowerCase()))
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
