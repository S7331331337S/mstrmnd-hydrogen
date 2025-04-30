"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Initial check
      const checkMobile = () => {
        setIsMobile(
          window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        )
      }

      // Check on mount
      checkMobile()

      // Check on resize
      window.addEventListener("resize", checkMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}
