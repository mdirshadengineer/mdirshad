"use client";

import { motion } from "framer-motion";
import { Card } from "shared/ui/card";
import { Code2, Lightbulb, Rocket } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: <Code2 className='h-6 w-6' />,
      title: "Software Development",
      description:
        "Crafting elegant solutions through modern technologies and timeless design principles."
    },
    {
      icon: <Rocket className='h-6 w-6' />,
      title: "SaaS Solutions",
      description:
        "Building sophisticated, scalable applications that elevate business operations."
    },
    {
      icon: <Lightbulb className='h-6 w-6' />,
      title: "Infrastructure Design",
      description:
        "Pioneering tomorrow's solutions through meticulous research and creative exploration."
    },
    {
      icon: <Lightbulb className='h-6 w-6' />,
      title: "R&D Innovation",
      description:
        "Pioneering tomorrow's solutions through meticulous research and creative exploration."
    }
  ];
  return (
    <section id='about' className='py-32 pt-0 relative'>
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none' />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center mb-20'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-primary/80 uppercase tracking-widest mb-4 font-medium'>
            Expertise & Vision
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-4xl md:text-5xl !leading-loose font-bold font-dancingScript mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Crafting Digital Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-muted-foreground text-lg leading-relaxed'>
            With a foundation built on years of expertise, I bring a refined
            approach to every project, merging technical precision with artistic
            vision.
          </motion.p>
        </div>

        <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-8'>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}>
              <Card className='p-8 h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden group'>
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='relative z-10'>
                  <div className='mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary'>
                    {skill.icon}
                  </div>
                  <h3 className='text-xl font-semibold mb-4'>{skill.title}</h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {skill.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export { About };
