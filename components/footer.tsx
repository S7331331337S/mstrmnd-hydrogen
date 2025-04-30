"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <footer className="border-t bg-background" ref={ref}>
      <div className="container py-12">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.div className="space-y-4" variants={item}>
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Showcase
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div className="space-y-4" variants={item}>
            <h3 className="text-sm font-medium">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Guides
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div className="space-y-4" variants={item}>
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div className="space-y-4" variants={item}>
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div className="space-y-4 sm:col-span-2 md:col-span-1" variants={item}>
            <h3 className="text-sm font-medium">Stay up to date</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest news and updates about our headless commerce framework.
            </p>
            <form className="mt-2 flex max-w-md gap-2 relative overflow-hidden group">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden"
              >
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </button>
            </form>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-12 border-t pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Your Business. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
