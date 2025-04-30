"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import { useMobile } from "@/hooks/use-mobile"

interface DeviceOptimizedSceneProps {
  className?: string
}

export function DeviceOptimizedScene({ className = "" }: DeviceOptimizedSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [fps, setFps] = useState(0)
  const [quality, setQuality] = useState("high")

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js to be loaded
    const checkThree = setInterval(() => {
      if ((window as any).THREE) {
        clearInterval(checkThree)
        initOptimizedScene()
      }
    }, 100)

    return () => clearInterval(checkThree)

    function initOptimizedScene() {
      const THREE = (window as any).THREE

      // Performance monitoring
      const times: number[] = []
      let fps = 0

      function measureFPS() {
        const now = performance.now()
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift()
        }
        times.push(now)
        fps = times.length
        setFps(fps)

        // Adjust quality based on FPS
        if (fps < 30 && quality !== "low") {
          setQuality("low")
          adjustQuality("low")
        } else if (fps >= 50 && fps < 55 && quality !== "medium") {
          setQuality("medium")
          adjustQuality("medium")
        } else if (fps >= 55 && quality !== "high") {
          setQuality("high")
          adjustQuality("high")
        }
      }

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x111827)

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      )
      camera.position.z = 5

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile, // Disable antialiasing on mobile
        powerPreference: "high-performance",
      })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2)) // Lower pixel ratio on mobile
      containerRef.current.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // Create objects with different quality levels
      const objectsHigh: THREE.Object3D[] = []
      const objectsMedium: THREE.Object3D[] = []
      const objectsLow: THREE.Object3D[] = []

      // High quality objects
      function createHighQualityObjects() {
        // Clear previous objects
        objectsHigh.forEach((obj) => scene.remove(obj))
        objectsHigh.length = 0

        // Create detailed torus knots
        for (let i = 0; i < 10; i++) {
          const geometry = new THREE.TorusKnotGeometry(
            0.5, // radius
            0.2, // tube
            128, // tubularSegments
            32, // radialSegments
            2, // p
            3, // q
          )

          const material = new THREE.MeshStandardMaterial({
            color: 0x4f8bff,
            metalness: 0.7,
            roughness: 0.2,
            envMapIntensity: 1.0,
          })

          const torusKnot = new THREE.Mesh(geometry, material)
          torusKnot.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8)

          scene.add(torusKnot)
          objectsHigh.push(torusKnot)
        }

        // Add point lights
        for (let i = 0; i < 3; i++) {
          const light = new THREE.PointLight(new THREE.Color().setHSL(Math.random(), 0.8, 0.5), 1, 10)

          light.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)

          scene.add(light)
          objectsHigh.push(light)
        }
      }

      // Medium quality objects
      function createMediumQualityObjects() {
        // Clear previous objects
        objectsMedium.forEach((obj) => scene.remove(obj))
        objectsMedium.length = 0

        // Create medium detail torus knots
        for (let i = 0; i < 8; i++) {
          const geometry = new THREE.TorusKnotGeometry(
            0.5, // radius
            0.2, // tube
            64, // tubularSegments
            16, // radialSegments
            2, // p
            3, // q
          )

          const material = new THREE.MeshStandardMaterial({
            color: 0x4f8bff,
            metalness: 0.7,
            roughness: 0.3,
          })

          const torusKnot = new THREE.Mesh(geometry, material)
          torusKnot.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8)

          scene.add(torusKnot)
          objectsMedium.push(torusKnot)
        }

        // Add point lights
        for (let i = 0; i < 2; i++) {
          const light = new THREE.PointLight(new THREE.Color().setHSL(Math.random(), 0.8, 0.5), 1, 10)

          light.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)

          scene.add(light)
          objectsMedium.push(light)
        }
      }

      // Low quality objects
      function createLowQualityObjects() {
        // Clear previous objects
        objectsLow.forEach((obj) => scene.remove(obj))
        objectsLow.length = 0

        // Create low detail objects (simple geometries)
        for (let i = 0; i < 6; i++) {
          const geometry = new THREE.BoxGeometry(1, 1, 1)

          const material = new THREE.MeshBasicMaterial({
            color: 0x4f8bff,
          })

          const cube = new THREE.Mesh(geometry, material)
          cube.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8)

          scene.add(cube)
          objectsLow.push(cube)
        }
      }

      // Adjust quality based on device and performance
      function adjustQuality(quality: string) {
        // Remove all objects
        ;[...objectsHigh, ...objectsMedium, ...objectsLow].forEach((obj) => scene.remove(obj))

        // Create new objects based on quality
        if (quality === "high") {
          createHighQualityObjects()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        } else if (quality === "medium") {
          createMediumQualityObjects()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        } else {
          createLowQualityObjects()
          renderer.setPixelRatio(1)
        }
      }

      // Initial quality setting based on device
      const initialQuality = isMobile ? "medium" : "high"
      setQuality(initialQuality)
      adjustQuality(initialQuality)

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      window.addEventListener("resize", handleResize)

      // Animation loop
      const clock = new THREE.Clock()

      const animate = () => {
        const elapsedTime = clock.getElapsedTime()

        // Animate high quality objects
        objectsHigh.forEach((obj, i) => {
          if (obj.type === "Mesh") {
            obj.rotation.x = elapsedTime * 0.2 + i * 0.1
            obj.rotation.y = elapsedTime * 0.3 + i * 0.1
          }
        })

        // Animate medium quality objects
        objectsMedium.forEach((obj, i) => {
          if (obj.type === "Mesh") {
            obj.rotation.x = elapsedTime * 0.2 + i * 0.1
            obj.rotation.y = elapsedTime * 0.3 + i * 0.1
          }
        })

        // Animate low quality objects
        objectsLow.forEach((obj, i) => {
          if (obj.type === "Mesh") {
            obj.rotation.x = elapsedTime * 0.2 + i * 0.1
            obj.rotation.y = elapsedTime * 0.3 + i * 0.1
          }
        })

        // Rotate camera around scene
        camera.position.x = Math.sin(elapsedTime * 0.2) * 5
        camera.position.z = Math.cos(elapsedTime * 0.2) * 5
        camera.lookAt(0, 0, 0)

        // Measure FPS every 10 frames
        if (Math.floor(elapsedTime * 60) % 10 === 0) {
          measureFPS()
        }

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        // Dispose resources
        ;[...objectsHigh, ...objectsMedium, ...objectsLow].forEach((obj) => {
          if ((obj as THREE.Mesh).geometry) {
            ;(obj as THREE.Mesh).geometry.dispose()
          }

          if ((obj as THREE.Mesh).material) {
            if (Array.isArray((obj as THREE.Mesh).material)) {
              ;(obj as THREE.Mesh).material.forEach((material: THREE.Material) => material.dispose())
            } else {
              ;((obj as THREE.Mesh).material as THREE.Material).dispose()
            }
          }
        })
      }
    }
  }, [isMobile])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />

      <div className={`relative ${className}`}>
        <div ref={containerRef} className="w-full h-full" />

        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          FPS: {fps} | Quality: {quality}
        </div>
      </div>
    </>
  )
}
