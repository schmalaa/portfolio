"use client";

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render the fallback UI if provided, otherwise an empty div
            return this.props.fallback || <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-bg-elevated)', borderRadius: '16px' }}><p style={{ color: 'var(--clr-text-muted)' }}>3D Experience Unavailable</p></div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
