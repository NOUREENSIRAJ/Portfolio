import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "@/scroll"

/**
 * Khilta hua phool. Scroll ke sath paankhuriyan khulti hain aur
 * poora phool ghoomta hua side badalta hai. Koi model file nahi.
 */

function makePetalGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.34, 0.22, 0.44, 0.82, 0, 1.28)
  shape.bezierCurveTo(-0.44, 0.82, -0.34, 0.22, 0, 0)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.045,
    bevelSegments: 4,
    curveSegments: 20,
  })
  geometry.center()
  geometry.translate(0, 0.64, 0)
  return geometry
}

type Layer = {
  count: number
  scale: number
  closed: number
  open: number
  color: string
  spin: number
}

// Cream background par saaf nazar aane ke liye rang thore gehre hain.
const LAYERS: Layer[] = [
  { count: 7, scale: 1.0, closed: 0.22, open: 1.34, color: "#e07fae", spin: 0 },
  { count: 7, scale: 0.78, closed: 0.16, open: 0.92, color: "#eda5c4", spin: 0.42 },
  { count: 5, scale: 0.54, closed: 0.1, open: 0.54, color: "#f6cbdb", spin: 0.85 },
]

const KEYFRAMES = [
  { at: 0.0, x: 0.0, y: -0.1, tiltZ: -0.12, scale: 1.0 },
  { at: 0.25, x: 1.85, y: 0.05, tiltZ: 0.18, scale: 0.8 },
  { at: 0.5, x: -1.85, y: 0.0, tiltZ: -0.24, scale: 0.74 },
  { at: 0.75, x: 1.7, y: -0.05, tiltZ: 0.16, scale: 0.72 },
  { at: 1.0, x: 0.0, y: 0.1, tiltZ: 0.0, scale: 0.96 },
]

function sampleKeyframe(p: number) {
  let i = 0
  while (i < KEYFRAMES.length - 2 && p > KEYFRAMES[i + 1]!.at) i++

  const a = KEYFRAMES[i]!
  const b = KEYFRAMES[i + 1]!
  const span = b.at - a.at
  const t = THREE.MathUtils.clamp(span > 0 ? (p - a.at) / span : 0, 0, 1)
  const e = t * t * (3 - 2 * t)

  return {
    x: THREE.MathUtils.lerp(a.x, b.x, e),
    y: THREE.MathUtils.lerp(a.y, b.y, e),
    tiltZ: THREE.MathUtils.lerp(a.tiltZ, b.tiltZ, e),
    scale: THREE.MathUtils.lerp(a.scale, b.scale, e),
  }
}

export default function Blossom({ still = false }: { still?: boolean }) {
  const root = useRef<THREE.Group>(null)
  const spinner = useRef<THREE.Group>(null)
  const petals = useRef<THREE.Group[][]>([[], [], []])
  const pointer = useRef({ x: 0, y: 0 })

  const geometry = useMemo(makePetalGeometry, [])

  const materials = useMemo(
    () =>
      LAYERS.map(
        (layer) =>
          new THREE.MeshPhysicalMaterial({
            color: layer.color,
            roughness: 0.3,
            metalness: 0,
            clearcoat: 0.85,
            clearcoatRoughness: 0.3,
            sheen: 1,
            sheenRoughness: 0.45,
            sheenColor: new THREE.Color("#fff3f7"),
            iridescence: 0.5,
            iridescenceIOR: 1.25,
            side: THREE.DoubleSide,
          }),
      ),
    [],
  )

  useFrame((state, delta) => {
    if (!root.current || !spinner.current) return

    const progress = still ? 0.35 : scroll.progress
    const k = sampleKeyframe(progress)
    const damp = 1 - Math.pow(0.0018, delta)

    if (!still) {
      pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x * 0.3, damp)
      pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y * 0.18, damp)
    }

    const drift = still ? 0 : Math.sin(state.clock.elapsedTime * 0.55) * 0.07

    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, k.x, damp)
    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, k.y + drift, damp)
    root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, k.tiltZ, damp)
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      0.62 + pointer.current.y,
      damp,
    )
    root.current.scale.setScalar(THREE.MathUtils.lerp(root.current.scale.x, k.scale, damp))

    if (still) {
      spinner.current.rotation.y = 0.4
    } else {
      spinner.current.rotation.y += delta * 0.16
    }

    const bloom = THREE.MathUtils.clamp(progress * 2.1, 0, 1)
    const eased = bloom * bloom * (3 - 2 * bloom)

    LAYERS.forEach((layer, li) => {
      const target = THREE.MathUtils.lerp(layer.closed, layer.open, eased)
      petals.current[li]?.forEach((pivot, pi) => {
        if (!pivot) return
        const jitter = Math.sin(pi * 2.4 + li) * 0.07
        pivot.rotation.x = THREE.MathUtils.lerp(pivot.rotation.x, target + jitter, damp)
      })
    })
  })

  return (
    <group ref={root}>
      <group ref={spinner}>
        {LAYERS.map((layer, li) => (
          <group key={li} rotation={[0, layer.spin, 0]}>
            {Array.from({ length: layer.count }).map((_, pi) => (
              <group
                key={pi}
                ref={(node) => {
                  if (node) petals.current[li]![pi] = node
                }}
                rotation={[layer.closed, (pi / layer.count) * Math.PI * 2, 0]}
              >
                <mesh geometry={geometry} material={materials[li]} scale={layer.scale} />
              </group>
            ))}
          </group>
        ))}

        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshPhysicalMaterial
            color="#fbe3c8"
            roughness={0.18}
            clearcoat={1}
            iridescence={0.9}
            iridescenceIOR={1.4}
          />
        </mesh>

        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i / 9) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.36, 0.14, Math.sin(angle) * 0.36]}
              scale={0.055}
            >
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color="#c9528a" roughness={0.4} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
