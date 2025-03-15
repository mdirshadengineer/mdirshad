"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "shared/lib/utils";
import { Card } from "shared/ui/card";

interface HeadingType {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1))
      }));
    setHeadings(elements);
  }, []);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        headingRefs.current[entry.target.id] = entry;
      });

      const visibleHeadings: { id: string; top: number }[] = [];
      Object.keys(headingRefs.current).forEach(key => {
        const entry = headingRefs.current[key];
        if (entry.isIntersecting) {
          visibleHeadings.push({
            id: key,
            top: entry.boundingClientRect.top
          });
        }
      });

      if (visibleHeadings.length > 0) {
        setActiveId(
          visibleHeadings.reduce((acc, curr) =>
            curr.top < acc.top ? curr : acc
          ).id
        );
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px"
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach(elem => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className='rounded-lg p-6 h-full shadow-lg ring-2 ring-zinc-200 dark:ring-zinc-900 transition-all duration-300'>
      <div className='space-y-3'>
        <p className='font-medium text-2xl text-zinc-800 dark:text-zinc-300'>
          Table of Contents
        </p>
        <div className='space-y-2'>
          {headings.map(heading => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors hover:text-zinc-200",
                activeId === heading.id
                  ? "text-zinc-800 dark:text-zinc-200 font-bold"
                  : "text-zinc-500 font-semibold",
                heading.level === 2 ? "pl-0" : "pl-4"
              )}
              onClick={e => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth"
                });
              }}>
              {heading.text}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
