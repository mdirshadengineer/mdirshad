import {
  defineDocumentType,
  makeSource,
  ComputedFields
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { transformerCopyButton } from "@rehype-pretty/transformers";

interface Doc {
  _raw: {
    flattenedPath: string;
  };
}

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc: Doc) => {
      const path = doc._raw.flattenedPath;
      const updatedPath = path.slice(
        path.indexOf("/articles/") + "/articles/".length
      );
      return "blog/" + updatedPath.replace(/\.mdx$/, "");
    }
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: Doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};

const Articles = defineDocumentType(() => ({
  name: "Articles",
  filePathPattern: "**/articles/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: false },
    description: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, default: [] },
    published: { type: "boolean", default: true }
  },
  computedFields
}));

export default makeSource({
  contentDirPath: "./src/contents",
  documentTypes: [Articles],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      [
        () =>
          rehypePrettyCode({
            theme: "github-dark",
            onVisitLine: (node: any) => {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine: (node: any) => {
              node.properties.className.push("line--highlighted");
            },
            onVisitHighlightedChars: (node: any) => {
              node.properties.className = ["word--highlighted"];
            }
            // transformers: [
            //     transformerCopyButton({
            //       visibility: "always",
            //       feedbackDuration: 3_000
            //     })
            // ]
          })
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"]
          }
        }
      ]
    ]
  },
  disableImportAliasWarning: true
});
