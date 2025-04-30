"use client"

import { useState, useEffect } from "react"
import { ProductViewer } from "./product-viewer"
import { ConfigOptions } from "./config-options"
import { ConfigPresets } from "./config-presets"
import { ShareConfig } from "./share-config"
import { ProductInfo } from "./product-info"
import { useProductConfig } from "./use-product-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export function ProductConfigurator() {
  const isMobile = useMobile()
  const { config, updateConfig, resetConfig, presets, applyPreset } = useProductConfig()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product Configurator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Product Viewer */}
          <div className="lg:col-span-2 bg-muted rounded-lg overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <ProductViewer config={config} isLoading={isLoading} />
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="bg-muted rounded-lg p-6">
            {isMobile ? (
              <Tabs defaultValue="options">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>
                <TabsContent value="options">
                  <ConfigOptions config={config} updateConfig={updateConfig} resetConfig={resetConfig} />
                </TabsContent>
                <TabsContent value="presets">
                  <ConfigPresets presets={presets} applyPreset={applyPreset} />
                </TabsContent>
                <TabsContent value="info">
                  <ProductInfo />
                </TabsContent>
              </Tabs>
            ) : (
              <>
                <ConfigOptions config={config} updateConfig={updateConfig} resetConfig={resetConfig} />
                <div className="border-t border-border my-6"></div>
                <ConfigPresets presets={presets} applyPreset={applyPreset} />
                <div className="border-t border-border my-6"></div>
                <ProductInfo />
              </>
            )}

            <div className="border-t border-border my-6"></div>
            <ShareConfig config={config} />
          </div>
        </div>
      </div>
    </div>
  )
}
