import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"
import Blossom from "./Blossom"

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export default function Scene() {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 6.4], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <color attach="background" args={["#f7f2ec"]} />

        {/* Halki roshni — cream background par phool naram lage, chamke nahi. */}
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 1, 3]} intensity={0.7} color="#ffd9e6" />
        <pointLight position={[0, -3, 3]} intensity={12} color="#ffe2d2" />

        <Suspense fallback={null}>
          <Blossom still={reduced} />
          {!reduced && (
            <Sparkles
              count={60}
              scale={[13, 8, 6]}
              size={2.2}
              speed={0.2}
              color="#d9679e"
              opacity={0.35}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
