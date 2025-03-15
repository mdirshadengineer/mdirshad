"use client";

import { allArticles } from ".contentlayer/generated";
import { compareDesc } from "date-fns";
import { Card } from "shared/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenIcon, StarIcon, TagIcon, CalendarIcon } from "lucide-react";

export default function Blog() {
  const posts = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date as string), new Date(b.date as string))
  );
  // console.log(posts);

  // Get the first post as featured
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className='max-w-6xl mx-auto px-4 pt-32'>
      {/* Header */}
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-4xl font-bold mb-4'>Blog</h1>
        <p className='text-lg text-muted-foreground'>
          Thoughts, ideas, and insights about development
        </p>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
            <StarIcon className='h-6 w-6 text-primary' />
            Featured Post
          </h2>
          <Link href={featuredPost.slug}>
            <Card className='p-8 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-primary/5 to-primary/10'>
              <article className='space-y-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <CalendarIcon className='h-4 w-4' />
                  {new Date(featuredPost.date as string).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }
                  )}
                </div>
                <h3 className='text-3xl font-bold hover:text-primary transition-colors'>
                  {featuredPost.title}
                </h3>
                <p className='text-muted-foreground text-lg'>
                  {featuredPost.description}
                </p>
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className='flex gap-2'>
                    {featuredPost.tags.map(tag => (
                      <span
                        key={tag}
                        className='flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full'>
                        <TagIcon className='h-3 w-3' />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Card>
          </Link>
        </motion.div>
      )}

      {/* Regular Posts */}
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {regularPosts.map(post => (
          <motion.div key={post._id} variants={item}>
            <Link href={post.slug} className='group block h-full'>
              <Card className='p-6 h-full hover:shadow-lg transition-all duration-300'>
                <article className='flex flex-col h-full gap-4'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <CalendarIcon className='h-4 w-4' />
                    {new Date(post.date as string).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                      {post.title}
                    </h3>
                    <p className='text-muted-foreground'>{post.description}</p>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className='flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded'>
                          <TagIcon className='h-3 w-3' />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='mt-16'>
        <Card className='p-8 bg-primary/5'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='flex-1'>
              <h2 className='text-2xl font-semibold mb-2'>Stay Updated</h2>
              <p className='text-muted-foreground'>
                Subscribe to get notified about new blog posts and updates.
              </p>
            </div>
            <div className='flex gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='px-4 py-2 rounded-lg border bg-background'
              />
              <button className='px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
