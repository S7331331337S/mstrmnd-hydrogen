"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const cubes = containerRef.current.querySelectorAll(".cube")
      cubes.forEach((cube, i) => {
        const factor = (i + 1) * 10
        const cubeElement = cube as HTMLElement
        cubeElement.style.transform = `
          translate3d(${x * factor}px, ${y * factor}px, 0)
          rotate3d(${y}, ${-x}, 0, ${Math.sqrt(x * x + y * y) * 10}deg)
        `
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800"
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[center_top_-1px]" />
      <div className="absolute inset-0">
        {/* 3D Cube elements with animation */}
        <div className="cube absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 transform rotate-45 skew-y-12 transition-transform duration-700" />
        <div className="cube absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/10 transform -rotate-12 skew-x-12 transition-transform duration-700" />
        <div className="cube absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 transform rotate-12 skew-y-6 transition-transform duration-700" />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40 lg:py-56">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Headless in
            <br />
            half the time
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your business headless stack that&apos;s engineered for performance and productivity.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative rounded border border-gray-700 bg-black/30 p-4 backdrop-blur-sm group overflow-hidden">
              <div className="font-mono text-sm text-white relative z-10">
                <span className="text-gray-400">$</span> npm create @your-business/headless@latest
              </div>
              <div className="absolute inset-0 rounded ring-1 ring-inset ring-teal-400/20" />
              <div className="absolute -inset-x-full bottom-0 h-px w-[200%] bg-gradient-to-r from-transparent via-teal-500 to-transparent group-hover:animate-shimmer" />
            </div>
          </motion.div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-white/10 hover:text-white group transition-all duration-300"
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="relative">
                Watch the overview (2:20)
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
