"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function hexPoints(radius: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + (i * 2 * Math.PI) / 6;
    pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
  }
  return pts;
}

/**
 * PLACEHOLDER 3D object standing in for the real NDR dragon crest, which
 * has not been supplied to this build (no logo file available — see
 * public/images/manifest.json). A hollow hexagonal medallion frame with
 * crossed rattan sticks inside — a real, recognizable Escrima/Arnis/Kali
 * emblem shape in its own right, not a guess at the client's actual
 * mark. Built as a RING rather than a solid disc specifically so red
 * only ever catches the beveled edge, never fills a large area, per the
 * design brief. Swap the ring/stick geometry for the real crest once a
 * vector or high-res logo file is provided; the lighting rig can stay.
 */
export function HeroCrest({
  pointer,
}: {
  pointer: { x: number; y: number };
}) {
  const group = useRef<THREE.Group>(null);
  const entrance = useRef(0);

  const ringGeometry = useMemo(() => {
    const outer = new THREE.Shape();
    const outerPts = hexPoints(1.5);
    outerPts.forEach(([x, y], i) =>
      i === 0 ? outer.moveTo(x, y) : outer.lineTo(x, y),
    );
    outer.closePath();

    const inner = new THREE.Path();
    const innerPts = hexPoints(1.18);
    innerPts.forEach(([x, y], i) =>
      i === 0 ? inner.moveTo(x, y) : inner.lineTo(x, y),
    );
    inner.closePath();
    outer.holes.push(inner);

    return new THREE.ExtrudeGeometry(outer, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 6,
    });
  }, []);

  const stickGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.045, 0.045, 2.0, 12),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    entrance.current = Math.min(1, entrance.current + delta * 0.9);
    const eased = 1 - Math.pow(1 - entrance.current, 3);

    const idleRotation = state.clock.elapsedTime * 0.1;
    const targetRotY = idleRotation + pointer.x * 0.3;
    const targetRotX = pointer.y * -0.2;

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

    group.current.scale.setScalar(eased);
  });

  return (
    <group ref={group}>
      <mesh geometry={ringGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#050202"
          metalness={0.75}
          roughness={0.3}
          emissive="#7a1620"
          emissiveIntensity={0.45}
        />
      </mesh>

      <mesh
        geometry={stickGeometry}
        position={[0, 0, 0.35]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <meshStandardMaterial color="#4a3018" roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh
        geometry={stickGeometry}
        position={[0, 0, 0.35]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        <meshStandardMaterial color="#4a3018" roughness={0.6} metalness={0.05} />
      </mesh>
    </group>
  );
}
