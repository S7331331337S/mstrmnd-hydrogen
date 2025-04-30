"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Showcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="bg-muted py-24" ref={ref}>
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See what others have built</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover how businesses are leveraging our headless commerce framework
          </p>
        </motion.div>
        <motion.div
          className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              variants={item}
              className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-all duration-500 hover:shadow-xl"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <Image
                  src={`/ecommerce-storefront.png?height=300&width=600&query=ecommerce storefront ${item}`}
                  alt={`Showcase example ${item}`}
                  width={600}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Showcase Example {item}</h3>
                <p className="mt-2 text-muted-foreground">
                  A custom storefront built with our headless commerce framework.
                </p>
                <div className="mt-4">
                  <Link
                    href={`/showcase/example-${item}`}
                    className="group flex items-center text-sm font-medium text-primary"
                  >
                    <span className="relative">
                      View case study
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button asChild className="relative overflow-hidden group">
            <Link href="/showcase">
              <span className="relative z-10">View all showcase examples</span>
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></span>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
