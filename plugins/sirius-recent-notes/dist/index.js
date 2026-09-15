import { createRequire } from 'module';
import { RecentNotes } from '@quartz-community/recent-notes';

createRequire(import.meta.url);
var DEFAULT_EXCLUDE_TAGS = ["\u4E3B\u9875", "\u4ECB\u7ECD"];
var RecentNotes_default = ((opts) => {
  const excluded = new Set(
    (opts?.excludeTags ?? DEFAULT_EXCLUDE_TAGS).map((tag) => tag.toLowerCase())
  );
  return RecentNotes({
    title: opts?.title,
    limit: opts?.limit ?? 2,
    showTags: opts?.showTags ?? true,
    filter: (f) => {
      const tags = f.frontmatter?.tags ?? [];
      return !tags.some((tag) => excluded.has(String(tag).toLowerCase()));
    }
  });
});

export { RecentNotes_default as RecentNotes };
