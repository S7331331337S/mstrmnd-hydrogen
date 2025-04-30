"use client"

import { ArrowRight, Code, Gauge, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ThreeProductViewer } from "./three-product-viewer"

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className="bg-background py-24" ref={ref}>
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for modern commerce</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create custom shopping experiences with our headless commerce framework
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.div variants={item}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                    <Gauge className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Performance-first</CardTitle>
                  <CardDescription>Optimized for speed with server components and streaming</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our framework is built with performance in mind, leveraging the latest React features for optimal
                    loading and rendering.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/docs/performance" className="group flex items-center text-sm font-medium text-primary">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Developer Experience</CardTitle>
                  <CardDescription>Intuitive APIs and comprehensive tooling</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Enjoy a seamless development workflow with hot module replacement, TypeScript support, and detailed
                    documentation.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/docs/developer-experience"
                    className="group flex items-center text-sm font-medium text-primary"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Flexible Architecture</CardTitle>
                  <CardDescription>Adapt to your business needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Build custom storefronts that perfectly match your brand and business requirements with our flexible
                    component system.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/docs/architecture" className="group flex items-center text-sm font-medium text-primary">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m2 12 20 0" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Global Commerce</CardTitle>
                  <CardDescription>Sell anywhere with multi-currency support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Reach customers worldwide with built-in internationalization, multi-currency pricing, and localized
                    checkout experiences.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/docs/global-commerce"
                    className="group flex items-center text-sm font-medium text-primary"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative min-h-[400px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ThreeProductViewer className="w-full h-[400px]" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
