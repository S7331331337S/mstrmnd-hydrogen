"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"

interface ThreePhysicsSceneProps {
  className?: string
}

export function ThreePhysicsScene({ className = "" }: ThreePhysicsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js and CANNON to be loaded
    const checkDependencies = setInterval(() => {
      if ((window as any).THREE && (window as any).CANNON) {
        clearInterval(checkDependencies)
        setIsReady(true)
        initPhysicsScene()
      }
    }, 100)

    return () => clearInterval(checkDependencies)

    function initPhysicsScene() {
      const THREE = (window as any).THREE
      const CANNON = (window as any).CANNON

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
      camera.position.set(0, 5, 10)
      camera.lookAt(0, 0, 0)

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      containerRef.current.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 10, 5)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.width = 1024
      directionalLight.shadow.mapSize.height = 1024
      scene.add(directionalLight)

      // Physics world
      const world = new CANNON.World()
      world.gravity.set(0, -9.82, 0) // Earth gravity
      world.broadphase = new CANNON.NaiveBroadphase()
      world.solver.iterations = 10

      // Ground
      const groundShape = new CANNON.Plane()
      const groundBody = new CANNON.Body({
        mass: 0, // Static body
        shape: groundShape,
      })
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Rotate to be flat
      world.addBody(groundBody)

      // Ground mesh
      const groundGeometry = new THREE.PlaneGeometry(30, 30)
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.3,
        roughness: 0.8,
      })
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
      groundMesh.rotation.x = -Math.PI / 2
      groundMesh.receiveShadow = true
      scene.add(groundMesh)

      // Create objects
      const objectsCount = 20
      const objectsBodyMeshPairs: { body: CANNON.Body; mesh: THREE.Mesh }[] = []

      const createObject = (type: "box" | "sphere", position: CANNON.Vec3, size: number, color: number) => {
        // Physics body
        let shape: CANNON.Shape
        let geometry: THREE.BufferGeometry

        if (type === "box") {
          shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2))
          geometry = new THREE.BoxGeometry(size, size, size)
        } else {
          shape = new CANNON.Sphere(size / 2)
          geometry = new THREE.SphereGeometry(size / 2, 32, 32)
        }

        const body = new CANNON.Body({
          mass: 1,
          shape: shape,
          position: position,
        })

        // Add some rotation
        body.angularVelocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)

        world.addBody(body)

        // Three.js mesh
        const material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.7,
          roughness: 0.2,
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)

        return { body, mesh }
      }

      // Create random objects
      for (let i = 0; i < objectsCount; i++) {
        const type = Math.random() > 0.5 ? "box" : "sphere"
        const size = Math.random() * 1 + 0.5
        const position = new CANNON.Vec3((Math.random() - 0.5) * 10, Math.random() * 10 + 5, (Math.random() - 0.5) * 10)

        // Generate a random color in the blue/purple range
        const hue = 0.6 + Math.random() * 0.2 // 0.6-0.8 is blue to purple
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5).getHex()

        const pair = createObject(type, position, size, color)
        objectsBodyMeshPairs.push(pair)
      }

      // Add a floor button to drop new objects
      const addNewObject = () => {
        const type = Math.random() > 0.5 ? "box" : "sphere"
        const size = Math.random() * 1 + 0.5
        const position = new CANNON.Vec3((Math.random() - 0.5) * 8, 10, (Math.random() - 0.5) * 8)

        // Generate a random color in the blue/purple range
        const hue = 0.6 + Math.random() * 0.2
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5).getHex()

        const pair = createObject(type, position, size, color)
        objectsBodyMeshPairs.push(pair)
      }

      // Add click event to container
      containerRef.current.addEventListener("click", addNewObject)

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
      let previousTime = 0

      const animate = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Update physics
        world.step(1 / 60, deltaTime, 3)

        // Update meshes
        for (const { body, mesh } of objectsBodyMeshPairs) {
          mesh.position.copy(body.position as any)
          mesh.quaternion.copy(body.quaternion as any)

          // Remove objects that fall too far
          if (body.position.y < -10) {
            scene.remove(mesh)
            world.removeBody(body)
            objectsBodyMeshPairs.splice(objectsBodyMeshPairs.indexOf({ body, mesh }), 1)
          }
        }

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        containerRef.current?.removeEventListener("click", addNewObject)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        // Dispose resources
        objectsBodyMeshPairs.forEach(({ mesh }) => {
          scene.remove(mesh)
          mesh.geometry.dispose()
          ;(mesh.material as THREE.Material).dispose()
        })

        groundMesh.geometry.dispose()
        groundMaterial.dispose()
      }
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/cannon@0.6.2/build/cannon.min.js" strategy="beforeInteractive" />

      <div className={`relative ${className}`}>
        <div ref={containerRef} className="w-full h-full cursor-pointer" />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="text-primary">Loading physics engine...</div>
          </div>
        )}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2 pointer-events-none">
          Click anywhere to drop objects
        </div>
      </div>
    </>
  )
}
