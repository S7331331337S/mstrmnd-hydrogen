"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import { Loader2 } from "lucide-react"
import type { ProductConfig } from "./types"
import { Button } from "@/components/ui/button"

interface ProductViewerProps {
  config: ProductConfig
  isLoading: boolean
}

export function ProductViewer({ config, isLoading }: ProductViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRotating, setIsRotating] = useState(true)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined" || !isScriptLoaded) return

    // Wait for Three.js to be loaded
    const checkThree = setInterval(() => {
      if ((window as any).THREE) {
        clearInterval(checkThree)
        initScene()
      }
    }, 100)

    return () => clearInterval(checkThree)

    function initScene() {
      const THREE = (window as any).THREE
      const { OrbitControls } = (window as any).THREE_ADDONS

      // Clear previous scene if it exists
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf5f5f5)

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 0, 5)

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.outputEncoding = THREE.sRGBEncoding
      containerRef.current.appendChild(renderer.domElement)

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 3
      controls.maxDistance = 10
      controls.autoRotate = isRotating
      controls.autoRotateSpeed = 1.0

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.width = 1024
      directionalLight.shadow.mapSize.height = 1024
      scene.add(directionalLight)

      // Environment map for reflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      new THREE.TextureLoader().load("/env-map.png", (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture
        scene.environment = envMap
        texture.dispose()
        pmremGenerator.dispose()
      })

      // Create product model
      const product = createProductModel(THREE, config)
      scene.add(product)

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
      const animate = () => {
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Update controls when isRotating changes
      const updateRotation = () => {
        controls.autoRotate = isRotating
      }
      updateRotation()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        // Dispose resources
        renderer.dispose()
        controls.dispose()
        scene.traverse((object: any) => {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
    }
  }, [config, isRotating, isScriptLoaded])

  // Create product model based on configuration
  function createProductModel(THREE: any, config: ProductConfig) {
    const group = new THREE.Group()

    // Base model - always present
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 1)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.baseColor),
      metalness: config.baseMaterial === "metal" ? 0.8 : 0.1,
      roughness: config.baseMaterial === "metal" ? 0.2 : 0.8,
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -0.5
    base.castShadow = true
    base.receiveShadow = true
    group.add(base)

    // Main body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.8)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.bodyColor),
      metalness: config.bodyMaterial === "metal" ? 0.8 : 0.1,
      roughness: config.bodyMaterial === "metal" ? 0.2 : 0.8,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Top part (optional)
    if (config.includeTopPart) {
      const topGeometry = new THREE.CylinderGeometry(0.3, 0.5, 0.4, 32)
      const topMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.topColor),
        metalness: config.topMaterial === "metal" ? 0.8 : 0.1,
        roughness: config.topMaterial === "metal" ? 0.2 : 0.8,
      })
      const top = new THREE.Mesh(topGeometry, topMaterial)
      top.position.y = 0.6
      top.castShadow = true
      top.receiveShadow = true
      group.add(top)
    }

    // Side attachments (based on count)
    if (config.sideAttachments > 0) {
      const attachmentGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const attachmentMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.attachmentColor),
        metalness: 0.5,
        roughness: 0.5,
      })

      for (let i = 0; i < config.sideAttachments; i++) {
        const attachment = new THREE.Mesh(attachmentGeometry, attachmentMaterial)

        // Position around the body
        const angle = (i / config.sideAttachments) * Math.PI * 2
        attachment.position.x = Math.cos(angle) * 0.9
        attachment.position.z = Math.sin(angle) * 0.5

        attachment.castShadow = true
        attachment.receiveShadow = true
        group.add(attachment)
      }
    }

    // Add logo if enabled
    if (config.includeLogo) {
      const logoGeometry = new THREE.PlaneGeometry(0.5, 0.2)
      const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      })
      const logo = new THREE.Mesh(logoGeometry, logoMaterial)
      logo.position.set(0, 0, 0.41)
      logo.rotation.x = Math.PI * 0.5
      logo.rotation.z = Math.PI * 0.5
      group.add(logo)
    }

    return group
  }

  const toggleRotation = () => {
    setIsRotating(!isRotating)
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // Load OrbitControls after Three.js is loaded
          const script = document.createElement("script")
          script.src = "https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/controls/OrbitControls.js"
          script.onload = () => setIsScriptLoaded(true)
          document.body.appendChild(script)
        }}
      />

      <div className="relative w-full h-full">
        <div ref={containerRef} className="w-full h-full" />

        {(isLoading || !isScriptLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Loading 3D model...</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <Button variant="outline" size="sm" onClick={toggleRotation} className="bg-background/80 backdrop-blur-sm">
            {isRotating ? "Stop Rotation" : "Start Rotation"}
          </Button>
        </div>
      </div>
    </>
  )
}
