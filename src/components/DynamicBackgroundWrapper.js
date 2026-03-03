"use client";

import dynamic from "next/dynamic";

// Dynamically import the heavy Three.js component only on the client side
const DynamicBackground = dynamic(() => import("./DynamicBackground"), {
    ssr: false,
});

export default function DynamicBackgroundWrapper() {
    return <DynamicBackground />;
}
