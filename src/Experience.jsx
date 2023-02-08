import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { useMemo, useRef } from "react";
import { useControls } from "leva";

export default function Experience() {
  const points = useRef();
  const shader = useRef();

  const { progress } = useControls({
    progress: {
      value: 0,
      max: 1,
      min: 0,
      step: 0.01,
      onChange: (value) => {
        shader.current.uniforms.u_Animation.value = value;
      },
    },
  });

  const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 3);
  const boxGeo = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10);
  icosahedronGeometry.setAttribute(
    "newPosition",
    new THREE.BufferAttribute(
      new Float32Array(boxGeo.attributes.position.array),
      3
    )
  );
  const uniforms = useMemo(() => ({
    u_Animation: { value: progress },
  }));

  return (
    <>
      <OrbitControls makeDefault />
      <points ref={points} geometry={icosahedronGeometry}>
        <shaderMaterial
          ref={shader}
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
        />
      </points>
    </>
  );
}
