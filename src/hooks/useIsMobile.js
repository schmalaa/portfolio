import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Initial check
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        
        checkMobile();

        // Listen for window resize
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [breakpoint]);

    return isMobile;
}
