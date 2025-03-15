"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "shared/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "shared/ui/navigation-menu";
import Link from "next/link";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();

  const deskTopMenuItems: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response."
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link."
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content."
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time."
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    }
  ];

  const menuItems = [
    { name: "Home", href: "/", haveMoreLinks: false },
    { name: "Blog", href: "/blog", haveMoreLinks: false },
    { name: "Experience", href: "#experience", haveMoreLinks: true },
    { name: "Projects", href: "#projects", haveMoreLinks: true },
    { name: "About", href: "#about", haveMoreLinks: false }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='fixed w-full top-4 bg-transparent z-50'>
      <div className='container mx-auto px-4'>
        <div
          id='mobile-menu'
          className='flex items-center rounded-md px-4 shadow-lg ring-2 ring-zinc-200 dark:ring-zinc-900 bg-background/80 backdrop-blur-sm justify-between h-16 z-50'>
          <motion.a
            href='#'
            className='text-2xl font-bold font-dancingScript'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            MDIX
          </motion.a>

          <div className='hidden md:flex space-x-8'>
            {menuItems.map((item, index) => (
              <NavigationMenu key={index}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    {/* <NavigationMenuContent>
                     <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                       <li className="row-span-3">
                         <NavigationMenuLink asChild>
                           <a
                             className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                             href="/"
                           >
                             <Icons.logo className="h-6 w-6" />
                             <div className="mb-2 mt-4 text-lg font-medium">
                               shadcn/ui
                             </div>
                             <p className="text-sm leading-tight text-muted-foreground">
                               Beautifully designed components built with Radix UI and
                               Tailwind CSS.
                             </p>
                           </a>
                         </NavigationMenuLink>
                       </li>
                       <ListItem href="/docs" title="Introduction">
                         Re-usable components built using Radix UI and Tailwind CSS.
                       </ListItem>
                       <ListItem href="/docs/installation" title="Installation">
                         How to install dependencies and structure your app.
                       </ListItem>
                       <ListItem href="/docs/primitives/typography" title="Typography">
                         Styles for headings, paragraphs, lists...etc
                       </ListItem>
                     </ul>
                   </NavigationMenuContent> */}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}

            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className='flex-shrink-0'>
              <SunIcon className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <MoonIcon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </div>

          {/* <div className='hidden md:flex space-x-8'>
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className='text-foreground/80 hover:text-foreground transition-colors font-semibold'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                {item.name}
              </motion.a>
            ))}
          </div> */}

          <Button
            id='mobile-menu-button'
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsOpen(!isOpen)}>
            <Menu className='h-10 w-10' />
          </Button>
        </div>
      </div>

      {/* Translucent background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className='md:hidden fixed top-0 left-0 right-0 mx-4 mt-4 rounded-md bg-background/90 backdrop-blur-sm shadow-lg ring-2 ring-zinc-200 dark:ring-zinc-900 z-50'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.9 } }}
            transition={{ duration: 0.7 }}>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <div className='flex items-center justify-between px-2 py-2'>
                <motion.a
                  href='/'
                  className='text-2xl font-bold font-dancingScript'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.5 }}>
                  MDIX
                </motion.a>
                <Button
                  id='mobile-menu-button'
                  variant='ghost'
                  size='icon'
                  className='md:hidden'
                  onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? (
                    <X className='h-6 w-6' />
                  ) : (
                    <Menu className='h-6 w-6' />
                  )}
                </Button>
              </div>
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className='block font-semibold px-3 py-2 text-foreground/80 hover:text-foreground transition-colors'
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
