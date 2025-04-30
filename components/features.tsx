"use client"

import { ArrowRight, Code, Gauge, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
        <motion.div
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
        </motion.div>
      </div>
    </div>
  )
}
