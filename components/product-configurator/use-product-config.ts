"use client"

import { useState, useEffect } from "react"
import type { ProductConfig, ProductPreset } from "./types"

// Default configuration
const defaultConfig: ProductConfig = {
  baseColor: "#1E40AF",
  baseMaterial: "metal",
  bodyColor: "#0369A1",
  bodyMaterial: "plastic",
  includeTopPart: true,
  topColor: "#0F766E",
  topMaterial: "plastic",
  sideAttachments: 4,
  attachmentColor: "#4338CA",
  includeLogo: true,
}

// Predefined presets
const productPresets: ProductPreset[] = [
  {
    id: "classic",
    name: "Classic",
    config: {
      ...defaultConfig,
      baseColor: "#1E40AF",
      bodyColor: "#0369A1",
      topColor: "#0F766E",
    },
  },
  {
    id: "modern",
    name: "Modern",
    config: {
      ...defaultConfig,
      baseColor: "#18181B",
      bodyColor: "#27272A",
      topColor: "#71717A",
      baseMaterial: "metal",
      bodyMaterial: "metal",
      topMaterial: "metal",
    },
  },
  {
    id: "vibrant",
    name: "Vibrant",
    config: {
      ...defaultConfig,
      baseColor: "#9F1239",
      bodyColor: "#9D174D",
      topColor: "#6D28D9",
      sideAttachments: 6,
    },
  },
  {
    id: "natural",
    name: "Natural",
    config: {
      ...defaultConfig,
      baseColor: "#854D0E",
      bodyColor: "#A16207",
      topColor: "#65A30D",
      baseMaterial: "wood",
      bodyMaterial: "wood",
      sideAttachments: 0,
    },
  },
]

export function useProductConfig() {
  const [config, setConfig] = useState<ProductConfig>(defaultConfig)

  // Check URL for configuration parameters on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const configParam = params.get("config")

      if (configParam) {
        try {
          const parsedConfig = JSON.parse(decodeURIComponent(configParam))
          setConfig(parsedConfig)
        } catch (error) {
          console.error("Error parsing configuration from URL:", error)
        }
      }
    }
  }, [])

  // Update a single configuration property
  const updateConfig = (key: keyof ProductConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Reset to default configuration
  const resetConfig = () => {
    setConfig(defaultConfig)
  }

  // Apply a preset configuration
  const applyPreset = (preset: ProductPreset) => {
    setConfig(preset.config)
  }

  return {
    config,
    updateConfig,
    resetConfig,
    presets: productPresets,
    applyPreset,
  }
}
