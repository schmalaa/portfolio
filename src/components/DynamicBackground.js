"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShapes() {
    const sphereRef1 = useRef();
    const sphereRef2 = useRef();
    const sphereRef3 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (sphereRef1.current) {
            sphereRef1.current.position.y = Math.sin(t * 0.5) * 2;
            sphereRef1.current.rotation.x = t * 0.2;
        }
        if (sphereRef2.current) {
            sphereRef2.current.position.y = Math.cos(t * 0.4) * 2 - 1;
            sphereRef2.current.rotation.y = t * 0.3;
        }
        if (sphereRef3.current) {
            sphereRef3.current.position.x = Math.sin(t * 0.3) * 3;
            sphereRef3.current.position.y = Math.cos(t * 0.3) * 1 + 2;
        }
    });

    return (
        <>
            {/* Primary vibrant purple blob */}
            <Sphere ref={sphereRef1} args={[4, 64, 64]} position={[-8, 0, -10]}>
                <MeshDistortMaterial
                    color="#7c3aed"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.15}
                />
            </Sphere>

            {/* Secondary electric blue blob */}
            <Sphere ref={sphereRef2} args={[3, 64, 64]} position={[8, -2, -8]}>
                <MeshDistortMaterial
                    color="#0ea5e9"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.15}
                />
            </Sphere>

            {/* Accent pink/magenta blob */}
            <Sphere ref={sphereRef3} args={[2.5, 64, 64]} position={[0, 4, -15]}>
                <MeshDistortMaterial
                    color="#ec4899"
                    attach="material"
                    distort={0.3}
                    speed={1}
                    roughness={0.4}
                    transparent
                    opacity={0.1}
                />
            </Sphere>
        </>
    );
}

export default function DynamicBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Push it all the way to the back
            background: 'linear-gradient(to bottom right, #0a0a0f, #13111c)', // Base dark gradient
            pointerEvents: 'none' // Let clicks pass through to the real website
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

                {/* Immersive floating particles */}
                <Sparkles
                    count={150}
                    scale={20}
                    size={2}
                    speed={0.2}
                    opacity={0.3}
                    color="#c4b5fd"
                />

                {/* Large distorted color blobs */}
                <AnimatedShapes />
            </Canvas>
        </div>
    );
}
