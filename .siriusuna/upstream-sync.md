# 同步上游 Quartz

## 远端配置

```
origin    git@github.com:Siriusuna/Siriusuna.git      你的仓库
upstream  https://github.com/jackyzha0/quartz.git     上游 Quartz(只读)
```

`upstream` 已经配好,且 **push 地址被故意设成了无效值**,避免手滑往上游推:

```bash
git remote set-url --push upstream DISABLED_read_only
```

确认:

```bash
git remote -v
```

> **`v5` 分支当前追踪的是 `upstream/v5`。** 推到你自己的仓库之后,建议改成追踪 origin:
>
> ```bash
> git push -u origin v5
> ```

> **注意**:本仓库和上游**没有共同的 git 历史**(最早的 commit 是 `Initialized`,是复制代码后
> 重新 init 的)。`v5` 分支是直接从 `upstream/v5` 建出来的,所以**从 v5 开始才有共同历史**,
> 后续同步是正常的 merge,不需要 `--allow-unrelated-histories`。

## 日常同步

```bash
npx quartz upgrade
```

它会:备份 `content/` → 从 `upstream/v5` 拉取并合并 → 显示版本变化 → `npm install` →
按 lockfile 恢复插件 → 检查插件兼容性。

手动等价操作:

```bash
git fetch upstream v5
git merge upstream/v5
npm ci
npm run build:plugins
npx quartz plugin install --from-config
npx quartz build
```

更新社区插件到最新版:

```bash
npx quartz plugin install --latest
```

## 同步之后一定要做

1. **`npm run build:plugins`** —— 上游若改了插件 API,本地插件需要用新的
   `@quartz-community/types` 重新编译。
2. **`npx quartz build`** 跑通,并本地 `--serve` 目视检查。
3. 若 `dist/` 有变化,**连同 `dist/` 一起提交**。

## 冲突处理

因为所有个性化都在上游不碰的位置,冲突应该很少。可能出现冲突的只有这几个文件:

| 文件                           | 处理方式                                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `quartz.ts`                    | 上游是 5 行的默认实现。保留上游版本,再把 `registerCondition("sirius-landing-page", ...)` 那段加回去(见 [customizations.md](customizations.md)) |
| `quartz/styles/custom.scss`    | 上游几乎不动它。取我们的版本,但注意顶部的 `@use` 是否需要跟随上游调整                                                                          |
| `package.json`                 | 取上游的依赖,然后把 `build:plugins` 脚本和 `tsup` / `sass` / `reading-time` 三个 devDependency 加回去                                          |
| `.gitignore`                   | 保留上游内容,把末尾 `# --- Siriusuna ---` 那段接回去                                                                                           |
| `.github/workflows/deploy.yml` | 这是我们自己的文件,上游没有同名文件,不会冲突                                                                                                   |

**上游自带的那些 workflow(`ci.yaml`、`build-preview.yaml`、`docker-build-push.yaml` 等)
保持原样不要删。** 它们都带 `if: ${{ github.repository == 'jackyzha0/quartz' }}` 守卫,在 fork 里
会直接跳过、不消耗多少额度;而一旦删掉,上游每次改动这些文件都会产生
"deleted by us" 冲突。(v4 时期是删掉的,现在改变了做法。)

如果合并中途卡住想放弃:

```bash
git merge --abort
npx quartz restore   # 从缓存恢复 content/
```

## 检查上游有没有新东西

```bash
git fetch upstream
git log --oneline HEAD..upstream/v5 | head -30      # 有哪些新提交
git diff --stat HEAD upstream/v5 -- quartz/         # 核心改了多少
```

看版本号:

```bash
git show upstream/v5:package.json | head -6
```
