import { createRequire } from 'module';
import { jsx, jsxs } from 'preact/jsx-runtime';

const require$1 = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require$1 !== "undefined" ? require$1 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require$1 !== "undefined" ? require$1 : a)[b]
}) : x)(function(x) {
  if (typeof require$1 !== "undefined") return require$1.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// ../../node_modules/reading-time/lib/reading-time.js
var require_reading_time = __commonJS({
  "../../node_modules/reading-time/lib/reading-time.js"(exports, module) {
    function codeIsInRanges(number, arrayOfRanges) {
      return arrayOfRanges.some(
        ([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound
      );
    }
    function isCJK(c) {
      if ("string" !== typeof c) {
        return false;
      }
      const charCode = c.charCodeAt(0);
      return codeIsInRanges(
        charCode,
        [
          // Hiragana (Katakana not included on purpose,
          // context: https://github.com/ngryman/reading-time/pull/35#issuecomment-853364526)
          // If you think Katakana should be included and have solid reasons, improvement is welcomed
          [12352, 12447],
          // CJK Unified ideographs
          [19968, 40959],
          // Hangul
          [44032, 55203],
          // CJK extensions
          [131072, 191456]
        ]
      );
    }
    function isAnsiWordBound(c) {
      return " \n\r	".includes(c);
    }
    function isPunctuation(c) {
      if ("string" !== typeof c) {
        return false;
      }
      const charCode = c.charCodeAt(0);
      return codeIsInRanges(
        charCode,
        [
          [33, 47],
          [58, 64],
          [91, 96],
          [123, 126],
          // CJK Symbols and Punctuation
          [12288, 12351],
          // Full-width ASCII punctuation variants
          [65280, 65519]
        ]
      );
    }
    function readingTime2(text, options = {}) {
      let words = 0, start = 0, end = text.length - 1;
      const wordsPerMinute = options.wordsPerMinute || 200;
      const isWordBound = options.wordBound || isAnsiWordBound;
      while (isWordBound(text[start])) start++;
      while (isWordBound(text[end])) end--;
      const normalizedText = `${text}
`;
      for (let i = start; i <= end; i++) {
        if (isCJK(normalizedText[i]) || !isWordBound(normalizedText[i]) && (isWordBound(normalizedText[i + 1]) || isCJK(normalizedText[i + 1]))) {
          words++;
        }
        if (isCJK(normalizedText[i])) {
          while (i <= end && (isPunctuation(normalizedText[i + 1]) || isWordBound(normalizedText[i + 1]))) {
            i++;
          }
        }
      }
      const minutes = words / wordsPerMinute;
      const time = Math.round(minutes * 60 * 1e3);
      const displayed = Math.ceil(minutes.toFixed(2));
      return {
        text: displayed + " min read",
        minutes,
        time,
        words
      };
    }
    module.exports = readingTime2;
  }
});

// ../../node_modules/reading-time/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/reading-time/lib/stream.js"(exports, module) {
    var readingTime2 = require_reading_time();
    var Transform = __require("stream").Transform;
    var util = __require("util");
    function ReadingTimeStream(options) {
      if (!(this instanceof ReadingTimeStream)) {
        return new ReadingTimeStream(options);
      }
      Transform.call(this, { objectMode: true });
      this.options = options || {};
      this.stats = {
        minutes: 0,
        time: 0,
        words: 0
      };
    }
    util.inherits(ReadingTimeStream, Transform);
    ReadingTimeStream.prototype._transform = function(chunk, encoding, callback) {
      const stats = readingTime2(chunk.toString(encoding), this.options);
      this.stats.minutes += stats.minutes;
      this.stats.time += stats.time;
      this.stats.words += stats.words;
      callback();
    };
    ReadingTimeStream.prototype._flush = function(callback) {
      this.stats.text = Math.ceil(this.stats.minutes.toFixed(2)) + " min read";
      this.push(this.stats);
      callback();
    };
    module.exports = ReadingTimeStream;
  }
});

// ../../node_modules/reading-time/index.js
var require_reading_time2 = __commonJS({
  "../../node_modules/reading-time/index.js"(exports, module) {
    module.exports.default = module.exports = require_reading_time();
    module.exports.readingTimeStream = require_stream();
  }
});

// ../../node_modules/@quartz-community/utils/dist/date.js
function formatDate(d, locale = "en-US") {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

// ../../node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/ContentMeta.tsx
var import_reading_time = __toESM(require_reading_time2());

// src/components/styles/contentMeta.scss
var contentMeta_default = '.content-meta {\n  margin-top: 0;\n  color: var(--darkgray);\n}\n.content-meta[show-comma=true] > *:not(:last-child) {\n  margin-right: 8px;\n}\n.content-meta[show-comma=true] > *:not(:last-child)::after {\n  content: ",";\n}';
var defaultOptions = {
  showReadingTime: true,
  showComma: true,
  dateLocale: "en-US"
};
var DATE_FIELDS = [
  { key: "created", emoji: "\u270F\uFE0F" },
  { key: "modified", emoji: "\u{1F527}" },
  { key: "published", emoji: "\u{1F4C4}" }
];
function DateSegment({ date, locale, emoji }) {
  return /* @__PURE__ */ jsxs("span", { children: [
    emoji,
    " ",
    /* @__PURE__ */ jsx("time", { datetime: date.toISOString(), children: formatDate(date, locale) })
  ] });
}
var ContentMeta_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  function ContentMetadata({ fileData, displayClass }) {
    const text = fileData.text;
    if (!text) return null;
    const segments = [];
    const dates = fileData.dates;
    if (dates) {
      for (const { key, emoji } of DATE_FIELDS) {
        const value = dates[key];
        if (!value) continue;
        const date = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(date.getTime())) continue;
        segments.push(/* @__PURE__ */ jsx(DateSegment, { date, locale: options.dateLocale, emoji }));
      }
    }
    if (options.showReadingTime) {
      const { minutes } = (0, import_reading_time.default)(text);
      segments.push(/* @__PURE__ */ jsx("span", { children: `${Math.ceil(minutes)} min read` }));
    }
    return /* @__PURE__ */ jsx("p", { "show-comma": options.showComma, class: classNames(displayClass, "content-meta"), children: segments });
  }
  ContentMetadata.css = contentMeta_default;
  return ContentMetadata;
});
/*! Bundled license information:

reading-time/lib/reading-time.js:
reading-time/lib/stream.js:
  (*!
   * reading-time
   * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
   * MIT Licensed
   *)
*/

export { ContentMeta_default as ContentMeta };
