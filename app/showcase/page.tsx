"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThreeGLTFModel } from "@/components/three-gltf-model"
import { ThreeShaderBackground } from "@/components/three-shader-background"
import { ThreePhysicsScene } from "@/components/three-physics-scene"
import { ThreeSceneTransition } from "@/components/three-scene-transition"
import { DeviceOptimizedScene } from "@/components/device-optimized-scene"
import { motion } from "framer-motion"

export default function ShowcasePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero section with shader background */}
        <section className="relative min-h-[60vh] flex items-center">
          <ThreeShaderBackground />

          <div className="container relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Advanced 3D Showcase</h1>
              <p className="text-xl text-gray-200 mb-8">
                Explore the power of Three.js with these interactive examples
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3D Model Showcase */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">3D Model Loading</h2>
              <p className="mt-4 text-muted-foreground">
                Load complex 3D models in GLTF format with animations and materials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted rounded-lg overflow-hidden h-[400px]">
                <ThreeGLTFModel modelPath="/abstract-3d-model.png" className="h-full" scale={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">GLTF Model Loader</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Load complex 3D models with textures and materials
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Support for animations and skeletal rigs
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Optimized loading with progress tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Proper resource management and cleanup
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Shaders */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Custom Shaders</h2>
              <p className="mt-4 text-muted-foreground">Create unique visual effects with GLSL shaders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">GLSL Shader Effects</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Custom fragment and vertex shaders
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Animated gradients and patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Procedural noise and textures
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Responsive to screen size changes
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-lg overflow-hidden h-[400px] order-1 md:order-2">
                <ThreeShaderBackground className="h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Physics */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Physics Interactions</h2>
              <p className="mt-4 text-muted-foreground">Realistic object interactions with physics simulation</p>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden h-[500px] mb-8">
              <ThreePhysicsScene className="h-full" />
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Interactive Physics Engine</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Realistic gravity and collision detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Interactive objects that respond to clicks
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Multiple object shapes and materials
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Optimized performance with object pooling
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Proper cleanup of physics resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Responsive to window resizing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scene Transitions */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Scene Transitions</h2>
              <p className="mt-4 text-muted-foreground">Smooth transitions between different 3D scenes</p>
            </div>

            <div className="bg-background rounded-lg overflow-hidden h-[500px] mb-8">
              <ThreeSceneTransition className="h-full" />
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Animated Scene Transitions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Smooth shader-based transitions between scenes
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Multiple transition effects and patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Controlled timing and easing functions
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Memory-efficient scene management
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Optimized render targets for transitions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Interactive scene selection controls
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Optimization */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Mobile Optimization</h2>
              <p className="mt-4 text-muted-foreground">Adaptive rendering based on device capabilities</p>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden h-[500px] mb-8">
              <DeviceOptimizedScene className="h-full" />
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Adaptive Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Automatic device capability detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Dynamic quality adjustment based on FPS
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Optimized geometries for mobile devices
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Simplified materials on lower-end devices
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Reduced pixel ratio for better performance
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Real-time performance monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
