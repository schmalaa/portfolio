'use client';

import React from 'react';

export default function StatusHeader({ projects }) {
    const totalProjects = projects.length;
    const readyProjects = projects.filter(p => p.latestDeployment?.state === 'READY').length;
    const errorProjects = projects.filter(p => p.latestDeployment?.state === 'ERROR' || p.latestDeployment?.state === 'CANCELED').length;
    const buildingProjects = projects.filter(p => p.latestDeployment?.state === 'BUILDING' || p.latestDeployment?.state === 'QUEUED').length;

    const getSystemStatus = () => {
        if (errorProjects > 0) return { text: 'Degraded Performance', color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)' };
        if (buildingProjects > 0) return { text: 'Building Updates', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' };
        return { text: 'All Systems Operational', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' };
    };

    const status = getSystemStatus();

    return (
        <div className="status-header">
            <div className="header-top">
                <div>
                    <h1 className="title">System Status</h1>
                    <p className="subtitle">Real-time monitoring of Vercel deployments</p>
                </div>

                <div className="status-badge" style={{ backgroundColor: status.bg, borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="status-dot-container">
                        {status.text === 'All Systems Operational' && (
                            <span className="status-ping" style={{ backgroundColor: status.color }}></span>
                        )}
                        <span className="status-dot" style={{ backgroundColor: status.color }}></span>
                    </div>
                    <span style={{ color: status.color, fontWeight: 600 }}>{status.text}</span>
                </div>
            </div>

            <div className="stats-grid">
                {[
                    { label: 'Total Projects', value: totalProjects, color: 'var(--clr-text-main)' },
                    { label: 'Operational', value: readyProjects, color: '#34d399' },
                    { label: 'Building', value: buildingProjects, color: '#fbbf24' },
                    { label: 'Errors', value: errorProjects, color: '#f87171' },
                ].map((stat, i) => (
                    <div key={stat.label} className="stat-card glass-panel delay-1" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="stat-label">{stat.label}</div>
                        <div className="stat-value" style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .status-header {
          margin-bottom: 3rem;
        }
        .header-top {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .header-top {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }
        .title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, rgba(255,255,255,0.6));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          color: var(--clr-text-muted);
          font-size: 1.1rem;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          animation: reveal-up 0.5s ease forwards;
        }
        .status-dot-container {
          position: relative;
          display: flex;
          width: 0.75rem;
          height: 0.75rem;
        }
        .status-ping {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0.75;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .status-dot {
          position: relative;
          display: inline-flex;
          border-radius: 50%;
          width: 0.75rem;
          height: 0.75rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .stat-card {
          padding: 1.5rem;
          border-radius: 1rem;
          transition: var(--transition-normal);
          animation: reveal-up 0.5s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .stat-card:hover .stat-value {
          transform: scale(1.05);
        }
        .stat-label {
          color: var(--clr-text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          transition: transform var(--transition-normal);
          transform-origin: left;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes reveal-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
