"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// A sleek, modern abstract 3D shape (Icosahedron)
function AbstractShape({ isHovered }) {
    const meshRef = useRef(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            // Gently scale up when hovered
            const targetScale = isHovered ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={1.5} // XYZ rotation intensity
            floatIntensity={2} // Up/down float intensity
        >
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial
                    color="#7c3aed" // Vibrant Purple matching our CSS var(--clr-primary)
                    emissive="#2a0a4a"
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    wireframe={isHovered} // Cool wireframe effect on hover
                />
            </mesh>
        </Float>
    );
}

// A secondary contrasting shape
function SecondaryShape() {
    const meshRef = useRef(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.5;
            meshRef.current.rotation.z += delta * 0.2;
        }
    });

    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
            <mesh ref={meshRef} position={[2, -1.5, -2]}>
                <torusGeometry args={[0.5, 0.2, 16, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9" // Electric Blue matching var(--clr-secondary)
                    roughness={0.2}
                    metalness={0.5}
                />
            </mesh>
        </Float>
    )
}

export default function Hero3DElement() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="hero-3d-container"
            style={{ width: "100%", height: "100%", position: "relative", zIndex: 3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                {/* Lighting setup */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#7c3aed" />

                {/* 3D Objects */}
                <AbstractShape isHovered={isHovered} />
                <SecondaryShape />

                {/* Environment reflections to make the physical material look premium/glassy */}
                <Environment preset="city" />

                {/* Soft shadow underneath the objects */}
                {/* <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" /> */}

                {/* Let users rotate the shape! */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!isHovered}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2 + 0.2} // Prevent rotating totally underneath
                    minPolarAngle={Math.PI / 2 - 0.5} // Prevent rotating totally on top
                />
            </Canvas>
        </div>
    );
}
