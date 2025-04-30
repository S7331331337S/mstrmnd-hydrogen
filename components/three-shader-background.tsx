"use client"

import { useRef, useEffect } from "react"
import Script from "next/script"

interface ThreeShaderBackgroundProps {
  className?: string
}

export function ThreeShaderBackground({ className = "" }: ThreeShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    // Wait for Three.js to be loaded
    const checkThree = setInterval(() => {
      if ((window as any).THREE) {
        clearInterval(checkThree)
        initShaderScene()
      }
    }, 100)

    return () => clearInterval(checkThree)

    function initShaderScene() {
      const THREE = (window as any).THREE

      // Scene setup
      const scene = new THREE.Scene()

      // Camera setup
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Custom shader material
      const vertexShader = `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `

      const fragmentShader = `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                           + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Adjust UV coordinates
          vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
          
          // Create a gradient background
          vec3 color1 = vec3(0.1, 0.1, 0.2); // Dark blue
          vec3 color2 = vec3(0.05, 0.15, 0.3); // Lighter blue
          vec3 baseColor = mix(color1, color2, uv.y);
          
          // Add noise pattern
          float noise1 = snoise(p * 3.0 + time * 0.1);
          float noise2 = snoise(p * 6.0 - time * 0.2);
          float noise3 = snoise(p * 12.0 + time * 0.3);
          
          // Layer the noise
          float finalNoise = 
            0.5 * noise1 + 
            0.25 * noise2 + 
            0.125 * noise3;
          
          // Create flowing effect
          float flow = sin(p.x * 10.0 + time) * 0.1 + 
                      cos(p.y * 8.0 - time * 0.5) * 0.1;
          
          // Add highlights
          vec3 highlightColor = vec3(0.3, 0.5, 0.9); // Light blue
          float highlight = smoothstep(0.3, 0.7, finalNoise + flow);
          
          // Final color
          vec3 finalColor = mix(baseColor, highlightColor, highlight * 0.5);
          
          // Add subtle vignette
          float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
          finalColor *= vignette;
          
          gl_FragColor = vec4(finalColor, 0.9); // Slightly transparent
        }
      `

      // Create shader material
      const uniforms = {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      }

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
      })

      // Create a plane that fills the screen
      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, shaderMaterial)
      scene.add(mesh)

      // Handle window resize
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        uniforms.resolution.value.x = window.innerWidth
        uniforms.resolution.value.y = window.innerHeight
      }

      window.addEventListener("resize", handleResize)

      // Animation loop
      const clock = new THREE.Clock()

      const animate = () => {
        const elapsedTime = clock.getElapsedTime()
        uniforms.time.value = elapsedTime

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
        geometry.dispose()
        shaderMaterial.dispose()
      }
    }
  }, [])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js" strategy="beforeInteractive" />
      <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`} aria-hidden="true" />
    </>
  )
}
