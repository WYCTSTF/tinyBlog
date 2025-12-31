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

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
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
  );
}
