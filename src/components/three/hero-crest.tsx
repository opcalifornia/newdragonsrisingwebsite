"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * PLACEHOLDER 3D object standing in for the real NDR dragon crest, which
 * has not been supplied to this build (no logo file available — see
 * public/images/manifest.json). Built from a hexagonal shield outline
 * with crossed rattan sticks — a real, recognizable Escrima/Arnis/Kali
 * emblem in its own right, not a guess at the client's actual mark — so
 * the hero has something honest and on-theme to render in the meantime.
 * Swap the shield/stick geometry for the real crest once a vector or
 * high-res logo file is provided; the lighting rig can stay as-is.
 */
export function HeroCrest({
  pointer,
}: {
  pointer: { x: number; y: number };
}) {
  const group = useRef<THREE.Group>(null);
  const entrance = useRef(0);

  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const radius = 1.5;
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI / 2) + (i * 2 * Math.PI) / sides;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 4,
      curveSegments: 6,
    });
  }, []);

  const stickGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.055, 0.055, 2.6, 12),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    entrance.current = Math.min(1, entrance.current + delta * 0.9);
    const eased = 1 - Math.pow(1 - entrance.current, 3);

    const idleRotation = state.clock.elapsedTime * 0.12;
    const targetRotY = idleRotation + pointer.x * 0.35;
    const targetRotX = pointer.y * -0.25;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.06,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.06,
    );

    const scale = eased;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <mesh geometry={shieldGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a0507"
          metalness={0.6}
          roughness={0.35}
          emissive="#c41e2e"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh
        geometry={stickGeometry}
        position={[0, 0, 0.4]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <meshStandardMaterial color="#5a3b1e" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh
        geometry={stickGeometry}
        position={[0, 0, 0.4]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        <meshStandardMaterial color="#5a3b1e" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  );
}
