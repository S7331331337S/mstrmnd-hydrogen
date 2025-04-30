"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
}

export function AnimatedGradientBorder({ children, className = "" }: AnimatedGradientBorderProps) {
  return (
    <div className={`relative rounded-lg p-[1px] overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-purple-500/50 to-teal-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        className="absolute -inset-[1000%] bg-gradient-to-r from-primary via-purple-500 to-teal-500 opacity-30"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <div className="relative bg-background rounded-lg z-10">{children}</div>
    </div>
  )
}
