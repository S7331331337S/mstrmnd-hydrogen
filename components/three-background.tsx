"use client"

import { useRef, useEffect } from "react"
import Script from "next/script"

interface ThreeBackgroundProps {
  className?: string
}

export function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current?.appendChild(renderer.domElement)

      // Create gradient background
      const gradientTexture = createGradientTexture(THREE)
      scene.background = gradientTexture

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 1500

      const posArray = new Float32Array(particlesCount * 3)
      const scaleArray = new Float32Array(particlesCount)

      for (let i = 0; i < particlesCount * 3; i++) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 15

        // Scale (for each particle)
        if (i % 3 === 0) {
          scaleArray[i / 3] = Math.random()
        }
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
      particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

      // Material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        color: 0x4f8bff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })

      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      // Add cubes
      const cubes: THREE.Mesh[] = []
      const cubeCount = 10

      for (let i = 0; i < cubeCount; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const material = new THREE.MeshStandardMaterial({
          color: 0x4f8bff,
          transparent: true,
          opacity: 0.7,
          metalness: 0.8,
          roughness: 0.2,
        })

        const cube = new THREE.Mesh(geometry, material)

        // Position cubes in a scattered pattern
        cube.position.x = (Math.random() - 0.5) * 10
        cube.position.y = (Math.random() - 0.5) * 10
        cube.position.z = (Math.random() - 0.5) * 10

        // Random rotation
        cube.rotation.x = Math.random() * Math.PI
        cube.rotation.y = Math.random() * Math.PI

        scene.add(cube)
        cubes.push(cube)
      }

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 1, 1)
      scene.add(directionalLight)

      // Mouse movement effect
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0

      const windowHalfX = window.innerWidth / 2
      const windowHalfY = window.innerHeight / 2

      const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY
      }

      document.addEventListener("mousemove", onDocumentMouseMove)

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      // Animation loop
      const clock = new THREE.Clock()

      const animate = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update particles
        particlesMesh.rotation.y = elapsedTime * 0.05

        // Update cubes
        cubes.forEach((cube, i) => {
          cube.rotation.x += 0.003
          cube.rotation.y += 0.005

          // Make cubes float up and down
          cube.position.y += Math.sin(elapsedTime + i) * 0.003
        })

        // Update camera based on mouse position
        targetX = mouseX * 0.001
        targetY = mouseY * 0.001

        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (-targetY - camera.position.y) * 0.05

        camera.lookAt(scene.position)

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        document.removeEventListener("mousemove", onDocumentMouseMove)
        containerRef.current?.removeChild(renderer.domElement)

        // Dispose geometries and materials
        particlesGeometry.dispose()
        particlesMaterial.dispose()

        cubes.forEach((cube) => {
          cube.geometry.dispose()
          ;(cube.material as THREE.Material).dispose()
        })
      }
    }

    // Helper function to create gradient background
    function createGradientTexture(THREE: any) {
      const canvas = document.createElement("canvas")
      canvas.width = 2
      canvas.height = 2

      const context = canvas.getContext("2d")
      if (!context) return new THREE.Texture()

      // Create gradient
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a1029")
      gradient.addColorStop(1, "#0f2b4c")

      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true

      return texture
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`} aria-hidden="true" />
    </>
  )
}
