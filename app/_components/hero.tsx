"use client";

import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import { Button } from "shared/ui/button";

const Hero = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const title = "Developer".split("");

  return (
    <section className='min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 md:pt-20'>
      {/* Background Decorative Elements */}
      <motion.div
        className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className='absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-5xl 2xl:max-w-full mx-auto'>
          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='mb-8 inline-flex items-center gap-2 bg-secondary/50 dark:bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-border/70'>
            <Circle className='w-3 h-3 fill-primary text-primary animate-pulse' />
            <span className='text-sm font-medium'>
              3+ years of Software development
            </span>
          </motion.div>

          {/* Main Title */}
          <div className='mb-6 overflow-hidden'>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tighter mb-2 flex flex-wrap bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent'>
              {title.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial='hidden'
                  animate='visible'
                  className='inline-block'>
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
            <motion.span
              className='text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-br from-primary/70 to-primary/30 bg-clip-text text-transparent'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}>
              & Senior Technical Consultant
            </motion.span>
          </div>

          {/* Description */}
          <motion.div
            className='max-w-2xl mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}>
            <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
              Crafting scalable solutions and enhancing business processes with
              innovative development and technical expertise.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className='flex flex-wrap gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}>
            <Button size='lg' className='text-lg px-6'>
              View Portfolio
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button size='lg' variant='outline' className='text-lg px-6'>
              Technical Process
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}>
            {[
              { number: "3+", label: "Years Experience" },
              { number: "20+", label: "Projects Delivered" },
              { number: "5+", label: "Enterprise Clients" },
              { number: "4+", label: "Certifications" }
            ].map((stat, index) => (
              <div key={index} className='text-center'>
                <motion.h3
                  className='text-3xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}>
                  {stat.number}
                </motion.h3>
                <motion.p
                  className='text-muted-foreground'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}>
                  {stat.label}
                </motion.p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className='absolute inset-0 grid grid-cols-6 gap-4 pointer-events-none'>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className='border-l border-primary/5 dark:border-primary/10 h-full'
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </section>
  );
};

export { Hero };
