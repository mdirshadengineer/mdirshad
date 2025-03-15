"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";

interface MdxProps {
  code: string;
}

const components = {
  Image,
  // Add custom MDX components here
  pre: ({ children }: { children: React.ReactNode }) => {
    // console.log("Children:", children);
    return <CodeBlock>{children}</CodeBlock>;
  }
};

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <pre className='relative group'>
      <button
        onClick={() => {
          const code = (children as any)?.props?.children;
          console.log("Code:", code);
          if (typeof code === "string") {
            copyToClipboard(code);
          }
        }}
        className='absolute right-2 top-2 p-2 rounded-lg bg-[#27272a80] dark:bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity'
        title='Copy code'>
        {copied ? (
          <CheckIcon className='h-4 w-4 text-green-500' />
        ) : (
          <CopyIcon className='h-4 w-4' />
        )}
      </button>
      {children}
    </pre>
  );
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className='mdx'>
      <Component components={components} />
    </div>
  );
}
