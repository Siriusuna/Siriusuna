import { createRequire } from 'module';
import { jsx, Fragment } from 'preact/jsx-runtime';

createRequire(import.meta.url);

// ../../node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/scripts/waline.inline.ts
var waline_inline_default = 'var i="https://unpkg.com/@waline/client@v3/dist/waline.css",m="https://unpkg.com/@waline/client@v3/dist/waline.js";document.addEventListener("nav",async()=>{let n=document.getElementById("waline");if(!n)return;let{serverUrl:a,lang:o,pageview:s,comment:c,reaction:d,emoji:t,dark:r}=n.dataset;if(!document.querySelector(`link[href="${i}"]`)){let e=document.createElement("link");e.rel="stylesheet",e.href=i,document.head.appendChild(e)}let{init:l}=await import(m),p=l({el:"#waline",serverURL:a,lang:o,dark:r,pageview:s==="true",comment:c==="true",reaction:d==="true",emoji:t?JSON.parse(t):void 0,path:window.location.pathname});window.addCleanup(()=>p.destroy())});\n';
var WalineComment_default = ((opts) => {
  const WalineComment = ({ displayClass, fileData }) => {
    const commentsFlag = fileData.frontmatter?.comments;
    const disabled = typeof commentsFlag !== "undefined" && (!commentsFlag || commentsFlag === "false");
    if (disabled) return /* @__PURE__ */ jsx(Fragment, {});
    return /* @__PURE__ */ jsx(
      "div",
      {
        id: "waline",
        class: classNames(displayClass, "waline-container"),
        "data-server-url": opts?.serverUrl,
        "data-lang": opts?.lang ?? "zh-CN",
        "data-pageview": String(opts?.pageview ?? true),
        "data-comment": String(opts?.comment ?? true),
        "data-reaction": String(opts?.reaction ?? true),
        "data-emoji": opts?.emoji ? JSON.stringify(opts.emoji) : "",
        "data-dark": opts?.darkModeSelector ?? 'html[saved-theme="dark"]'
      }
    );
  };
  WalineComment.afterDOMLoaded = waline_inline_default;
  return WalineComment;
});

export { WalineComment_default as WalineComment };
