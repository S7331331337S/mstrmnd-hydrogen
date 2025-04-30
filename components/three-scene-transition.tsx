"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"

interface ThreeSceneTransitionProps {
  className?: string
}

export function ThreeSceneTransition({ className = "" }: ThreeSceneTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js to be loaded
    const checkThree = setInterval(() => {
      if ((window as any).THREE) {
        clearInterval(checkThree)
        initScenes()
      }
    }, 100)

    return () => clearInterval(checkThree)

    function initScenes() {
      const THREE = (window as any).THREE

      // Scene setup
      const scenes = [createScene1(THREE), createScene2(THREE), createScene3(THREE)]

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
      containerRef.current.appendChild(renderer.domElement)

      // Transition effect setup
      const transitionParams = {
        useShaderTransition: true,
        transitionSpeed: 2.0,
        texture: null as THREE.Texture | null,
        threshold: 0,
        progress: 0,
      }

      // Create transition shader
      const transitionMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse1: { value: null },
          tDiffuse2: { value: null },
          mixRatio: { value: 0.0 },
          threshold: { value: 0.1 },
          useTexture: { value: 1 },
          tMixTexture: { value: null },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float mixRatio;
          uniform sampler2D tDiffuse1;
          uniform sampler2D tDiffuse2;
          uniform sampler2D tMixTexture;
          uniform int useTexture;
          uniform float threshold;
          varying vec2 vUv;
          
          void main() {
            vec4 texel1 = texture2D(tDiffuse1, vUv);
            vec4 texel2 = texture2D(tDiffuse2, vUv);
            
            if (useTexture == 1) {
              vec4 transitionTexel = texture2D(tMixTexture, vUv);
              float r = mixRatio * (1.0 + threshold * 2.0) - threshold;
              float mixf = clamp((transitionTexel.r - r) * (1.0 / threshold), 0.0, 1.0);
              gl_FragColor = mix(texel1, texel2, mixf);
            } else {
              gl_FragColor = mix(texel1, texel2, mixRatio);
            }
          }
        `,
      })

      // Create render targets
      const renderTargetParams = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      }

      const renderTarget1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams)

      const renderTarget2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams)

      // Create transition scene
      const transitionQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), transitionMaterial)

      const transitionScene = new THREE.Scene()
      const transitionCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      transitionScene.add(transitionQuad)

      // Load transition texture
      const textureLoader = new THREE.TextureLoader()
      const noiseTexture = textureLoader.load("/noise-texture.png")
      transitionMaterial.uniforms.tMixTexture.value = noiseTexture

      // Handle scene transitions
      const changeScene = (index: number) => {
        if (transitioning) return

        setTransitioning(true)
        const newSceneIndex = index

        // Render current scene to target
        renderer.setRenderTarget(renderTarget1)
        renderer.render(scenes[currentScene], camera)

        // Render new scene to target
        renderer.setRenderTarget(renderTarget2)
        renderer.render(scenes[newSceneIndex], camera)

        // Set transition uniforms
        transitionMaterial.uniforms.tDiffuse1.value = renderTarget1.texture
        transitionMaterial.uniforms.tDiffuse2.value = renderTarget2.texture
        transitionMaterial.uniforms.mixRatio.value = 0

        // Animate transition
        const startTime = Date.now()
        const duration = 1000 // 1 second transition

        const animateTransition = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)

          transitionMaterial.uniforms.mixRatio.value = progress

          // Render transition
          renderer.setRenderTarget(null)
          renderer.render(transitionScene, transitionCamera)

          if (progress < 1) {
            requestAnimationFrame(animateTransition)
          } else {
            // Transition complete
            setCurrentScene(newSceneIndex)
            setTransitioning(false)
          }
        }

        animateTransition()
      }

      // Create scene 1 - Geometric shapes
      function createScene1(THREE: any) {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a1029)

        // Add objects
        const geometry1 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
        const material1 = new THREE.MeshStandardMaterial({
          color: 0x4f8bff,
          metalness: 0.7,
          roughness: 0.2,
        })
        const torusKnot = new THREE.Mesh(geometry1, material1)
        scene.add(torusKnot)

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x00ffff, 2, 10)
        pointLight.position.set(2, 2, 2)
        scene.add(pointLight)

        // Animation function
        scene.animate = (time: number) => {
          torusKnot.rotation.x = time * 0.3
          torusKnot.rotation.y = time * 0.5
        }

        return scene
      }

      // Create scene 2 - Particles
      function createScene2(THREE: any) {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0f2b4c)

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 2000

        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 10
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.05,
          sizeAttenuation: true,
          color: 0xff00ff,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        })

        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Animation function
        scene.animate = (time: number) => {
          particlesMesh.rotation.x = time * 0.1
          particlesMesh.rotation.y = time * 0.2
        }

        return scene
      }

      // Create scene 3 - Cubes grid
      function createScene3(THREE: any) {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x1a1a2e)

        // Create cubes grid
        const cubes: THREE.Mesh[] = []
        const gridSize = 5
        const spacing = 1.5

        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
              // Only create some of the cubes for performance
              if (Math.random() > 0.8) {
                const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
                const material = new THREE.MeshStandardMaterial({
                  color: 0x4f8bff,
                  metalness: 0.7,
                  roughness: 0.2,
                })

                const cube = new THREE.Mesh(geometry, material)
                cube.position.set(
                  (x - gridSize / 2) * spacing,
                  (y - gridSize / 2) * spacing,
                  (z - gridSize / 2) * spacing,
                )

                scene.add(cube)
                cubes.push(cube)
              }
            }
          }
        }

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // Animation function
        scene.animate = (time: number) => {
          cubes.forEach((cube, i) => {
            const offset = i * 0.01
            cube.rotation.x = time + offset
            cube.rotation.y = time * 0.5 + offset

            // Make cubes float up and down
            cube.position.y += Math.sin(time + i) * 0.003
          })
        }

        return scene
      }

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)

        // Update render targets
        renderTarget1.setSize(width, height)
        renderTarget2.setSize(width, height)
      }

      window.addEventListener("resize", handleResize)

      // Animation loop
      const clock = new THREE.Clock()

      const animate = () => {
        const elapsedTime = clock.getElapsedTime()

        // Only animate the current scene if not transitioning
        if (!transitioning) {
          scenes[currentScene].animate(elapsedTime)
          renderer.render(scenes[currentScene], camera)
        }

        requestAnimationFrame(animate)
      }

      animate()

      // Expose scene change function to component
      ;(window as any).changeThreeScene = changeScene

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        // Dispose resources
        renderTarget1.dispose()
        renderTarget2.dispose()
        transitionMaterial.dispose()
        transitionQuad.geometry.dispose()

        // Clean up all scenes
        scenes.forEach((scene) => {
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
        })
      }
    }
  }, [currentScene, transitioning])

  const handleSceneChange = (index: number) => {
    if (typeof window !== "undefined" && (window as any).changeThreeScene) {
      ;(window as any).changeThreeScene(index)
    }
  }

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />

      <div className={`relative ${className}`}>
        <div ref={containerRef} className="w-full h-full" />

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSceneChange(0)}
            disabled={transitioning || currentScene === 0}
            className="bg-black/50 border-white/20 text-white hover:bg-white/20"
          >
            Scene 1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSceneChange(1)}
            disabled={transitioning || currentScene === 1}
            className="bg-black/50 border-white/20 text-white hover:bg-white/20"
          >
            Scene 2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSceneChange(2)}
            disabled={transitioning || currentScene === 2}
            className="bg-black/50 border-white/20 text-white hover:bg-white/20"
          >
            Scene 3
          </Button>
        </div>
      </div>
    </>
  )
}
