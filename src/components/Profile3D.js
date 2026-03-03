"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material for an RGB split/wave hover effect on a single image
const transitionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const transitionFragmentShader = `
  uniform sampler2D tex;
  uniform float hoverState;
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate a wave effect based on time and hover state
    float wave = sin(uv.y * 20.0 + time * 5.0) * 0.02 * hoverState;
    
    // Apply RGB split distortion based on the wave
    vec4 texColorR = texture2D(tex, vec2(uv.x + wave, uv.y));
    vec4 texColorG = texture2D(tex, vec2(uv.x, uv.y));
    vec4 texColorB = texture2D(tex, vec2(uv.x - wave, uv.y));
    
    gl_FragColor = vec4(texColorR.r, texColorG.g, texColorB.b, 1.0);
  }
`;

function ProfileMesh() {
    const mesh = useRef();
    const material = useRef();
    const [hovered, setHover] = useState(false);

    // Load only the second profile image
    const texture = useTexture("/profile-2.jpg");

    // We use useMemo so the shader uniforms are only created once
    const uniforms = useMemo(
        () => ({
            tex: { value: texture },
            hoverState: { value: 0.0 },
            time: { value: 0.0 }
        }),
        [texture]
    );

    // Animate the hover state and subtle rotation on frame updates
    useFrame((state, delta) => {
        if (material.current) {
            // Smoothly interpolate the hover state factor
            material.current.uniforms.hoverState.value = THREE.MathUtils.lerp(
                material.current.uniforms.hoverState.value,
                hovered ? 1 : 0,
                0.1
            );
            // Increment time for the wave animation
            material.current.uniforms.time.value += delta;
        }

        // Subtle parallax rotation effect based on mouse position
        if (mesh.current) {
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (state.pointer.x * Math.PI) / 8, 0.1);
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, (state.pointer.y * Math.PI) / 8, 0.1);
        }
    });

    return (
        <mesh
            ref={mesh}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <planeGeometry args={[3, 4, 32, 32]} />
            <shaderMaterial
                ref={material}
                args={[{
                    uniforms: uniforms,
                    vertexShader: transitionVertexShader,
                    fragmentShader: transitionFragmentShader,
                }]}
            />
        </mesh>
    );
}

export default function Profile3D() {
    return (
        <div style={{ width: "100%", height: "400px", position: "relative" }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
                <ambientLight intensity={1} />
                <ProfileMesh />
            </Canvas>
        </div>
    );
}
