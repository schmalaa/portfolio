"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";

// Fetch contribution data from the open-source github-contributions-api
async function fetchContributions(username) {
    try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        return null;
    }
}

// A single days contribution cube
function ContributionCube({ position, count, color, date }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // If 0 contributions, make it very flat. Otherwise scale based on count.
    const height = count === 0 ? 0.1 : Math.max(0.2, count * 0.2);

    // Animate the hover effect slightly
    useFrame(() => {
        if (meshRef.current) {
            const targetY = hovered ? position[1] + 0.5 : position[1];
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.2);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={() => setHovered(false)}
                castShadow
                receiveShadow
            >
                {/* Width, Height, Depth */}
                <boxGeometry args={[0.8, height, 0.8]} />
                <meshStandardMaterial
                    color={hovered ? "#fff" : color}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* Show date and count on hover */}
            {hovered && (
                <Text
                    position={[0, height / 2 + 0.5, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.05}
                    outlineColor="#000"
                >
                    {`${count} contributions\n${date}`}
                </Text>
            )}
        </group>
    );
}

// The main 3D Graph
function Graph({ data }) {
    const groupRef = useRef();

    // Parse the data into a plottable grid
    const cubes = useMemo(() => {
        if (!data || !data.contributions) return [];

        // The Deno API returns data.contributions as an array of weeks (arrays of days)
        const flatContributions = data.contributions.flat();

        // Sort by date ascending (oldest to newest)
        flatContributions.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Take the last 60 items
        const recent = flatContributions.slice(-60);

        const items = [];
        const cols = 10; // Wrap every 10 days

        recent.forEach((day, index) => {
            const x = (index % cols) - (cols / 2); // Center X
            const z = Math.floor(index / cols) - 3; // Center Z

            let color = day.color;
            if (color === "#ebedf0") color = "#1e1e2f"; // Dark mode empty

            items.push({
                position: [x, 0, z],
                count: day.contributionCount, // using the Deno api's count key
                color: color,
                date: day.date,
                id: day.date
            });
        });

        return items;
    }, [data]);

    // slowly rotate the entire graph
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            <Float speed={2} floatIntensity={0.5} rotationIntensity={0.1}>
                {cubes.map((cube) => (
                    <ContributionCube key={cube.id} {...cube} />
                ))}
            </Float>
        </group>
    );
}

export default function GitHubGraph3D({ username = "schmalaa" }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const res = await fetchContributions(username);
            setData(res);
            setLoading(false);
        }
        load();
    }, [username]);

    return (
        <div className="github-graph-container" style={{ width: "100%", height: "400px", position: "relative", borderRadius: "16px", overflow: "hidden", background: "rgba(10, 10, 15, 0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>

            <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Recent GitHub Activity</h3>
                <p style={{ margin: 0, color: "var(--clr-text-muted)", fontSize: "0.9rem" }}>{username}</p>
                {loading && <p style={{ color: "var(--clr-primary)", fontSize: "0.8rem", marginTop: 5 }}>Loading 3D Graph...</p>}
            </div>

            {!loading && data && (
                <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Graph data={data} />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2 - 0.1} // don't go below ground
                    />
                </Canvas>
            )}

            {!loading && !data && (
                <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "var(--clr-text-muted)" }}>Unable to load GitHub data.</p>
                </div>
            )}
        </div>
    );
}
