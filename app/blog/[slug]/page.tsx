import { notFound } from "next/navigation";
import { allArticles, Articles } from ".contentlayer/generated";
import { Mdx } from "src/components/mdx";
import { TableOfContents } from "src/components/table-of-contents";
import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";

interface PostProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true; // or false, to 404 on unknown paths

async function getPostFromParams(slug: PostProps["params"]["slug"]) {
  try {
    // Validate the params for 'slug' and handle the error if missing
    if (!slug) {
      throw new Error("Invalid parameters: 'slug' is missing.");
    }

    // Find the post by comparing slug values
    const post = allArticles.find(article => {
      // console.log("Article:", article);
      return article.slugAsParams == slug; // Ensure you're returning a boolean
    });

    // Check for necessary properties of the post
    if (!post || !post.title || !post.body || !post.body.code) {
      return null; // Return null if post or necessary properties are missing
    }

    // Return the found post
    return post;
  } catch (error) {
    // Log and handle the error, ensuring a graceful failure
    console.error("Error fetching post from params:", error);
    return null; // Return null in case of an error
  }
}

// Generate static parameters for static generation
export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allArticles.map(post => ({
    slug: post.slug
  }));
}

// Main Page component
export default async function Page({
  params
}: {
  params: Promise<PostProps["params"]>;
}) {
  const resolvedParams = (await params).slug; // Resolve the params promise
  const post = await getPostFromParams(resolvedParams);
  // console.log(post);
  if (!post) {
    notFound(); // Return 404 if no post is found
  }

  return (
    <div className='min-h-screen pt-24 md:pt-20'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]'>
          {/* Article content */}
          <article className='prose mx-auto w-full max-w-4xl'>
            <div className='mb-8'>
              <h1 className='mb-2'>{post.title}</h1>
              {post.description && (
                <p className='text-lg text-zinc-400 mb-4'>{post.description}</p>
              )}
              <div className='flex items-center gap-2 text-sm text-zinc-600'>
                <CalendarDays className='h-4 w-4' />
                <time dateTime={post.date}>
                  {post.date && format(parseISO(post.date), "LLLL d, yyyy")}
                </time>
              </div>
            </div>
            {/* Render MDX content */}
            <Mdx code={post.body.code} />
          </article>
          {/* Table of Contents */}
          <div className='hidden lg:block'>
            <div className='sticky top-32'>
              {/* <div className='rounded-lg border border-zinc-500 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900/50 p-6 backdrop-blur'> */}
              <TableOfContents />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
