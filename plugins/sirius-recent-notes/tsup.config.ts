import { makeTsupConfig } from "../tsup.base"

export default makeTsupConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
  },
  external: ["@quartz-community/recent-notes"],
})
