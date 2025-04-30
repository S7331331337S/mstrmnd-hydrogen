"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { ThreeBackground } from "./three-background"
import { ThreeCubeScene } from "./three-cube-scene"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800 min-h-[80vh] flex items-center">
      {/* Three.js background */}
      <ThreeBackground />

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
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

      {/* Interactive 3D cube */}
      <div className="absolute bottom-10 right-10 w-40 h-40 md:w-64 md:h-64 hidden md:block">
        <ThreeCubeScene />
      </div>
    </div>
  )
}
