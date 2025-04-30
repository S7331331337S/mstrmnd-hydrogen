"use client"

import Link from "next/link"
import { Github, Menu, Rss, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isScrolled ? "bg-background/95 shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110"
              whileHover={{ rotate: 10 }}
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </motion.svg>
            <motion.span
              className="font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              YOUR BUSINESS
            </motion.span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {["SHOWCASE", "INTEGRATIONS", "UPDATES", "DOCS"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-primary relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            {[
              { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
              { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
              { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", label: "YouTube" },
              { icon: <Rss className="h-5 w-5" />, href: "/rss", label: "RSS" },
            ].map((item, index) => (
              <motion.div key={item.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="icon" className="relative overflow-hidden">
                    {item.icon}
                    <span className="sr-only">{item.label}</span>
                    <span className="absolute inset-0 rounded-full bg-primary/0 hover:bg-primary/10 transition-colors duration-300"></span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="relative overflow-hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
                <span className="absolute inset-0 rounded-full bg-primary/0 hover:bg-primary/10 transition-colors duration-300"></span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {["SHOWCASE", "INTEGRATIONS", "UPDATES", "DOCS"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
                <div className="flex gap-4 mt-4">
                  {[
                    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
                    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
                    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", label: "YouTube" },
                    { icon: <Rss className="h-5 w-5" />, href: "/rss", label: "RSS" },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon">
                        {item.icon}
                        <span className="sr-only">{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
