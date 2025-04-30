"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"

interface ThreeGLTFModelProps {
  modelPath: string
  className?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function ThreeGLTFModel({
  modelPath,
  className = "",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ThreeGLTFModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js and GLTFLoader to be loaded
    const checkDependencies = setInterval(() => {
      if ((window as any).THREE && (window as any).GLTFLoader) {
        clearInterval(checkDependencies)
        initScene()
      }
    }, 100)

    return () => clearInterval(checkDependencies)

    function initScene() {
      const THREE = (window as any).THREE
      const GLTFLoader = (window as any).GLTFLoader

      // Scene setup
      const scene = new THREE.Scene()

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
        antialias: true,
        alpha: true,
      })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0
      containerRef.current.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // Add a loading indicator
      const loadingGeometry = new THREE.SphereGeometry(1, 16, 16)
      const loadingMaterial = new THREE.MeshStandardMaterial({
        color: 0x4f8bff,
        wireframe: true,
      })
      const loadingMesh = new THREE.Mesh(loadingGeometry, loadingMaterial)
      scene.add(loadingMesh)

      // GLTF Loader
      const loader = new GLTFLoader()

      // Load the model
      loader.load(
        modelPath,
        (gltf) => {
          // Remove loading indicator
          scene.remove(loadingMesh)

          // Add the model to the scene
          const model = gltf.scene

          // Apply scale and position
          model.scale.set(scale, scale, scale)
          model.position.set(position[0], position[1], position[2])
          model.rotation.set(rotation[0], rotation[1], rotation[2])

          // Traverse the model to enable shadows
          model.traverse((node: any) => {
            if (node.isMesh) {
              node.castShadow = true
              node.receiveShadow = true
            }
          })

          scene.add(model)
          setLoading(false)

          // Animation mixer if the model has animations
          if (gltf.animations && gltf.animations.length) {
            const mixer = new THREE.AnimationMixer(model)
            const action = mixer.clipAction(gltf.animations[0])
            action.play()

            // Update the mixer in the animation loop
            const clock = new THREE.Clock()

            const animateWithMixer = () => {
              const delta = clock.getDelta()
              mixer.update(delta)
              renderer.render(scene, camera)
              requestAnimationFrame(animateWithMixer)
            }

            animateWithMixer()
          } else {
            // Simple rotation animation if no animations in the model
            const animate = () => {
              model.rotation.y += 0.005
              renderer.render(scene, camera)
              requestAnimationFrame(animate)
            }

            animate()
          }
        },
        (xhr) => {
          // Loading progress
          const progress = (xhr.loaded / xhr.total) * 100
          console.log(`Loading model: ${Math.round(progress)}%`)
        },
        (error) => {
          console.error("Error loading model:", error)
          setError("Failed to load 3D model")
          setLoading(false)
        },
      )

      // Loading animation
      const animateLoading = () => {
        if (loading) {
          loadingMesh.rotation.x += 0.01
          loadingMesh.rotation.y += 0.02
          renderer.render(scene, camera)
          requestAnimationFrame(animateLoading)
        }
      }

      animateLoading()

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

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        // Dispose resources
        loadingGeometry.dispose()
        loadingMaterial.dispose()
      }
    }
  }, [modelPath, scale, position, rotation])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/loaders/GLTFLoader.js"
        strategy="beforeInteractive"
      />

      <div className={`relative ${className}`}>
        <div ref={containerRef} className="w-full h-full" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="text-primary">Loading 3D model...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="text-red-500">{error}</div>
          </div>
        )}
      </div>
    </>
  )
}
