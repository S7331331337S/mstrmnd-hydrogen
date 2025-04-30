"use client"

import type { ProductConfig } from "./types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RotateCcw } from "lucide-react"

interface ConfigOptionsProps {
  config: ProductConfig
  updateConfig: (key: keyof ProductConfig, value: any) => void
  resetConfig: () => void
}

export function ConfigOptions({ config, updateConfig, resetConfig }: ConfigOptionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Customize Your Product</h3>
        <Button variant="ghost" size="sm" onClick={resetConfig}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Base Options */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-muted-foreground">Base</h4>

        <div className="grid gap-2">
          <Label htmlFor="baseColor">Base Color</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-md border-2"
                  style={{ backgroundColor: config.baseColor }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#1E40AF",
                    "#1E3A8A",
                    "#0369A1",
                    "#0E7490",
                    "#0F766E",
                    "#047857",
                    "#166534",
                    "#3F6212",
                    "#854D0E",
                    "#7C2D12",
                    "#9F1239",
                    "#9D174D",
                    "#A21CAF",
                    "#7E22CE",
                    "#6D28D9",
                    "#4338CA",
                    "#1D4ED8",
                    "#0284C7",
                    "#0F766E",
                    "#059669",
                  ].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-md"
                      style={{ backgroundColor: color }}
                      onClick={() => updateConfig("baseColor", color)}
                    />
                  ))}
                </div>
                <div className="flex items-center mt-4">
                  <Input
                    id="baseColor"
                    value={config.baseColor}
                    className="flex-1"
                    onChange={(e) => updateConfig("baseColor", e.target.value)}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Select value={config.baseMaterial} onValueChange={(value) => updateConfig("baseMaterial", value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Body Options */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-muted-foreground">Body</h4>

        <div className="grid gap-2">
          <Label htmlFor="bodyColor">Body Color</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-md border-2"
                  style={{ backgroundColor: config.bodyColor }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#1E40AF",
                    "#1E3A8A",
                    "#0369A1",
                    "#0E7490",
                    "#0F766E",
                    "#047857",
                    "#166534",
                    "#3F6212",
                    "#854D0E",
                    "#7C2D12",
                    "#9F1239",
                    "#9D174D",
                    "#A21CAF",
                    "#7E22CE",
                    "#6D28D9",
                    "#4338CA",
                    "#1D4ED8",
                    "#0284C7",
                    "#0F766E",
                    "#059669",
                  ].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-md"
                      style={{ backgroundColor: color }}
                      onClick={() => updateConfig("bodyColor", color)}
                    />
                  ))}
                </div>
                <div className="flex items-center mt-4">
                  <Input
                    id="bodyColor"
                    value={config.bodyColor}
                    className="flex-1"
                    onChange={(e) => updateConfig("bodyColor", e.target.value)}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Select value={config.bodyMaterial} onValueChange={(value) => updateConfig("bodyMaterial", value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Top Part Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="includeTopPart" className="cursor-pointer">
            Include Top Part
          </Label>
          <Switch
            id="includeTopPart"
            checked={config.includeTopPart}
            onCheckedChange={(checked) => updateConfig("includeTopPart", checked)}
          />
        </div>

        {config.includeTopPart && (
          <div className="grid gap-2 pl-4 border-l-2 border-muted">
            <Label htmlFor="topColor">Top Color</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-10 h-10 p-0 rounded-md border-2"
                    style={{ backgroundColor: config.topColor }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#1E40AF",
                      "#1E3A8A",
                      "#0369A1",
                      "#0E7490",
                      "#0F766E",
                      "#047857",
                      "#166534",
                      "#3F6212",
                      "#854D0E",
                      "#7C2D12",
                      "#9F1239",
                      "#9D174D",
                      "#A21CAF",
                      "#7E22CE",
                      "#6D28D9",
                      "#4338CA",
                      "#1D4ED8",
                      "#0284C7",
                      "#0F766E",
                      "#059669",
                    ].map((color) => (
                      <Button
                        key={color}
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-md"
                        style={{ backgroundColor: color }}
                        onClick={() => updateConfig("topColor", color)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <Input
                      id="topColor"
                      value={config.topColor}
                      className="flex-1"
                      onChange={(e) => updateConfig("topColor", e.target.value)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Select value={config.topMaterial} onValueChange={(value) => updateConfig("topMaterial", value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Side Attachments */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sideAttachments">Side Attachments ({config.sideAttachments})</Label>
          </div>
          <Slider
            id="sideAttachments"
            min={0}
            max={8}
            step={1}
            value={[config.sideAttachments]}
            onValueChange={(value) => updateConfig("sideAttachments", value[0])}
          />
        </div>

        {config.sideAttachments > 0 && (
          <div className="grid gap-2 pl-4 border-l-2 border-muted">
            <Label htmlFor="attachmentColor">Attachment Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-10 flex justify-between items-center">
                  <span>Select Color</span>
                  <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: config.attachmentColor }} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#1E40AF",
                    "#1E3A8A",
                    "#0369A1",
                    "#0E7490",
                    "#0F766E",
                    "#047857",
                    "#166534",
                    "#3F6212",
                    "#854D0E",
                    "#7C2D12",
                    "#9F1239",
                    "#9D174D",
                    "#A21CAF",
                    "#7E22CE",
                    "#6D28D9",
                    "#4338CA",
                    "#1D4ED8",
                    "#0284C7",
                    "#0F766E",
                    "#059669",
                  ].map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-md"
                      style={{ backgroundColor: color }}
                      onClick={() => updateConfig("attachmentColor", color)}
                    />
                  ))}
                </div>
                <div className="flex items-center mt-4">
                  <Input
                    id="attachmentColor"
                    value={config.attachmentColor}
                    className="flex-1"
                    onChange={(e) => updateConfig("attachmentColor", e.target.value)}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Logo Option */}
      <div className="flex items-center justify-between">
        <Label htmlFor="includeLogo" className="cursor-pointer">
          Include Logo
        </Label>
        <Switch
          id="includeLogo"
          checked={config.includeLogo}
          onCheckedChange={(checked) => updateConfig("includeLogo", checked)}
        />
      </div>
    </div>
  )
}
