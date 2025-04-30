"use client"

import type { ProductPreset } from "./types"
import { Button } from "@/components/ui/button"

interface ConfigPresetsProps {
  presets: ProductPreset[]
  applyPreset: (preset: ProductPreset) => void
}

export function ConfigPresets({ presets, applyPreset }: ConfigPresetsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Presets</h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            className="h-auto py-3 flex flex-col items-center justify-center gap-2 hover:bg-muted/50"
            onClick={() => applyPreset(preset)}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-border"
              style={{ backgroundColor: preset.config.bodyColor }}
            />
            <span className="text-sm font-medium">{preset.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
