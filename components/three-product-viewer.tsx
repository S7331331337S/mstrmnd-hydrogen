"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"

interface ThreeProductViewerProps {
  className?: string
}

export function ThreeProductViewer({ className = "" }: ThreeProductViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js to be loaded from CDN
    if (!(window as any).THREE) {
      const checkThreeInterval = setInterval(() => {
        if ((window as any).THREE) {
          clearInterval(checkThreeInterval)
          initThreeScene()
        }
      }, 100)
      return () => clearInterval(checkThreeInterval)
    } else {
      initThreeScene()
    }

    function initThreeScene() {
      const THREE = (window as any).THREE

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x111827) // Match the dark theme

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      )
      camera.position.z = 5

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 1, 1)
      scene.add(directionalLight)

      // Add a placeholder sphere while loading
      const placeholderGeometry = new THREE.SphereGeometry(1, 32, 32)
      const placeholderMaterial = new THREE.MeshStandardMaterial({
        color: 0x4f8bff,
        metalness: 0.7,
        roughness: 0.2,
      })
      const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial)
      scene.add(placeholder)

      // Simple rotation controls
      let isDragging = false
      let previousMousePosition = { x: 0, y: 0 }
      const rotationSpeed = { x: 0, y: 0 }
      let autoRotate = true
      const autoRotateSpeed = 0.5

      // Mouse events for manual rotation
      const onMouseDown = (event: MouseEvent) => {
        isDragging = true
        autoRotate = false
        previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        }
      }

      const onMouseMove = (event: MouseEvent) => {
        if (isDragging) {
          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y,
          }

          rotationSpeed.x = deltaMove.y * 0.01
          rotationSpeed.y = deltaMove.x * 0.01

          previousMousePosition = {
            x: event.clientX,
            y: event.clientY,
          }
        }
      }

      const onMouseUp = () => {
        isDragging = false
        setTimeout(() => {
          autoRotate = true
        }, 1500)
      }

      containerRef.current.addEventListener("mousedown", onMouseDown)
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)

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
      let product: THREE.Mesh | null = null

      const animate = () => {
        if (product) {
          if (isDragging) {
            product.rotation.x += rotationSpeed.x
            product.rotation.y += rotationSpeed.y
          } else if (autoRotate) {
            product.rotation.y += autoRotateSpeed * 0.01
          }
        } else if (placeholder) {
          placeholder.rotation.y += 0.01
        }

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Simulate loading a 3D model (in a real app, you'd load an actual model)
      setTimeout(() => {
        scene.remove(placeholder)

        // Create a more complex shape to represent a product
        const productGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
        const productMaterial = new THREE.MeshStandardMaterial({
          color: 0x4f8bff,
          metalness: 0.7,
          roughness: 0.2,
        })
        product = new THREE.Mesh(productGeometry, productMaterial)
        scene.add(product)

        setLoading(false)
      }, 1000)

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        containerRef.current?.removeChild(renderer.domElement)
        containerRef.current?.removeEventListener("mousedown", onMouseDown)
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)

        // Dispose geometries and materials
        placeholderGeometry.dispose()
        placeholderMaterial.dispose()
        if (product) {
          product.geometry.dispose()
          ;(product.material as THREE.Material).dispose()
        }
      }
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <div className={`relative ${className}`}>
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="text-primary">Loading 3D model...</div>
          </div>
        )}
      </div>
    </>
  )
}
