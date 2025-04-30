"use client"

import { useRef, useEffect } from "react"
import Script from "next/script"

export function ThreeCubeScene() {
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
      const camera = new THREE.PerspectiveCamera(
        75,
        1, // Square aspect ratio
        0.1,
        1000,
      )
      camera.position.z = 3

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Create cube with Shopify-like texture
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)

      // Create materials for each face with different colors
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Right
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Left
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Top
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Bottom
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Front
        new THREE.MeshStandardMaterial({ color: 0x4f8bff, metalness: 0.7, roughness: 0.2 }), // Back
      ]

      const cube = new THREE.Mesh(geometry, materials)
      scene.add(cube)

      // Add wireframe to the cube
      const wireframeGeometry = new THREE.BoxGeometry(1.51, 1.51, 1.51)
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
      scene.add(wireframe)

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 1, 1)
      scene.add(directionalLight)

      // Add point lights for dramatic effect
      const pointLight1 = new THREE.PointLight(0x00ffff, 2, 10)
      pointLight1.position.set(2, 2, 2)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0xff00ff, 2, 10)
      pointLight2.position.set(-2, -2, -2)
      scene.add(pointLight2)

      // Simple rotation instead of OrbitControls
      const autoRotateSpeed = 1
      let isDragging = false
      let previousMousePosition = { x: 0, y: 0 }
      const rotationSpeed = { x: 0, y: 0 }

      // Mouse events for manual rotation
      const onMouseDown = (event: MouseEvent) => {
        isDragging = true
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
      const animate = () => {
        if (!isDragging) {
          cube.rotation.y += autoRotateSpeed * 0.01
          wireframe.rotation.y += autoRotateSpeed * 0.01
        } else {
          cube.rotation.x += rotationSpeed.x
          cube.rotation.y += rotationSpeed.y
          wireframe.rotation.x += rotationSpeed.x
          wireframe.rotation.y += rotationSpeed.y
        }

        // Pulse the wireframe
        const time = Date.now() * 0.001
        wireframe.scale.x = 1 + Math.sin(time) * 0.05
        wireframe.scale.y = 1 + Math.sin(time) * 0.05
        wireframe.scale.z = 1 + Math.sin(time) * 0.05

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        containerRef.current?.removeChild(renderer.domElement)
        containerRef.current?.removeEventListener("mousedown", onMouseDown)
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)

        // Dispose geometries and materials
        geometry.dispose()
        wireframeGeometry.dispose()
        wireframeMaterial.dispose()

        materials.forEach((material) => material.dispose())
      }
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" aria-hidden="true" />
    </>
  )
}
