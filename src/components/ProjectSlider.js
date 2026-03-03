"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProjectSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="image-placeholder">
                <span>No images provided</span>
            </div>
        );
    }

    return (
        <div className="slider-container" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>

            {/* Images Container */}
            <div
                className="slider-track"
                style={{
                    display: 'flex',
                    height: '100%',
                    transition: 'transform 0.5s ease-out',
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {images.map((imgSrc, index) => (
                    <div key={index} style={{ minWidth: '100%', position: 'relative', height: '100%' }}>
                        <Image
                            src={imgSrc}
                            alt={`Project screenshot ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="project-img-inner"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
