"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

// Plugin to transform :::spoiler into a custom node
function remarkSpoiler() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name === "spoiler") {
          const data = node.data || (node.data = {});
          const tagName = "spoiler";

          data.hName = tagName;
          data.hProperties = node.attributes;
        }
      }
    });
  };
}

const Spoiler = ({ children }: { children: React.ReactNode }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out cursor-pointer rounded-md overflow-hidden my-4 border border-gray-700 ${
        revealed ? "bg-transparent" : "bg-gray-800 select-none"
      }`}
      onClick={() => setRevealed(true)}
    >
      <div
        className={`transition-all duration-500 p-4 ${
          revealed ? "filter-none opacity-100" : "blur-md opacity-50"
        }`}
      >
        {children}
      </div>
      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest z-10 pointer-events-none">
          Click to Reveal
        </div>
      )}
    </div>
  );
};

const MarkdownEditor = () => {
  const [content, setContent] = useState<string>(
    `# Hello World

This is a normal text.

:::spoiler
This is a **hidden** secret!

It can contain multiple lines and markdown.
:::

More text.`
  );

  return (
    <div className="flex h-screen w-full bg-gray-950">
      {/* Editor Pane */}
      <div className="w-1/2 h-full border-r border-gray-800 bg-gray-900 text-gray-200 p-4 flex flex-col">
        <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Editor</h2>
        <textarea
          className="w-full flex-1 bg-transparent resize-none outline-none font-mono text-sm p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type markdown here..."
        />
      </div>

      {/* Preview Pane */}
      <div className="w-1/2 h-full overflow-auto bg-gray-950 text-gray-200 p-8 flex flex-col">
         <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Preview</h2>
         <div className="prose prose-invert max-w-none flex-1">
            <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkDirective, remarkSpoiler]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
                spoiler: Spoiler as any,
            }}
            >
            {content}
            </ReactMarkdown>
         </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;