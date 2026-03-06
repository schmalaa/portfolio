'use client';

import React from 'react';

export default function ProjectStatusCard({ project }) {
    const deployment = project.latestDeployment;

    // Default to neutral
    let stateColors = { bg: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.3)' };
    let statusText = 'Unknown';

    if (deployment) {
        statusText = deployment.state;
        switch (deployment.state) {
            case 'READY':
                stateColors = { bg: 'rgba(52, 211, 153, 0.2)', text: '#34d399', border: 'rgba(52, 211, 153, 0.5)' };
                break;
            case 'ERROR':
            case 'CANCELED':
                stateColors = { bg: 'rgba(248, 113, 113, 0.2)', text: '#f87171', border: 'rgba(248, 113, 113, 0.5)' };
                break;
            case 'BUILDING':
            case 'QUEUED':
                stateColors = { bg: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.5)' };
                break;
            default:
                break;
        }
    }

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return 'Never';
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + 'yr ago';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + 'mo ago';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + 'd ago';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + 'h ago';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + 'm ago';
        return Math.floor(seconds) + 's ago';
    };

    return (
        <div className="project-card glass-panel">
            <div className="card-highlight" />

            <div className="card-content">
                <div className="card-header">
                    <div>
                        <h3 className="project-title" title={project.name}>
                            {project.name}
                        </h3>
                        <div className="project-meta">
                            <span className="capitalize">{project.framework || 'Custom'}</span>
                            <span className="dot">•</span>
                            <span>Updated {formatTimeAgo(project.updatedAt)}</span>
                        </div>
                    </div>

                    <div className="status-pill" style={{ backgroundColor: stateColors.bg, color: stateColors.text, borderColor: stateColors.border }}>
                        {deployment?.state === 'BUILDING' && (
                            <svg className="spinner" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {statusText}
                    </div>
                </div>

                {deployment ? (
                    <div className="deployment-info">
                        <div className="deployment-box">
                            <div className="deployment-box-header">
                                <span className="label">Latest Deployment</span>
                                <span className="time">{formatTimeAgo(deployment.created)}</span>
                            </div>
                            <div className="deployment-creator">
                                <span className="avatar">
                                    {deployment.creator?.charAt(0).toUpperCase()}
                                </span>
                                <span className="creator-text">{deployment.creator} deployed to Production</span>
                            </div>
                        </div>

                        {deployment.url && (
                            <a
                                href={`https://${deployment.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="visit-btn"
                            >
                                Visit Deployment
                                <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="no-deployment">
                        No recent deployments found.
                    </div>
                )}
            </div>

            <style jsx>{`
        .project-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        
        .card-highlight {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: linear-gradient(to top right, transparent, rgba(255,255,255,0.05), transparent);
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .project-card:hover .card-highlight {
          opacity: 1;
        }

        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--clr-text-main);
          margin-bottom: 0.25rem;
          transition: color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .project-card:hover .project-title {
          color: var(--clr-secondary);
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--clr-text-muted);
          font-size: 0.85rem;
        }
        .capitalize { text-transform: capitalize; }
        
        .status-pill {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          height: 0.75rem;
          width: 0.75rem;
        }
        .opacity-25 { opacity: 0.25; }
        .opacity-75 { opacity: 0.75; }

        .deployment-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }

        .deployment-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .deployment-box-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .label { color: rgba(255, 255, 255, 0.4); }
        .time { color: rgba(255, 255, 255, 0.6); }

        .deployment-creator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .avatar {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background: linear-gradient(to bottom right, var(--clr-secondary), var(--clr-primary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .creator-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .visit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--clr-text-main);
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }
        .visit-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .arrow-icon {
          width: 1rem;
          height: 1rem;
          margin-left: 0.5rem;
          transition: transform 0.3s ease;
        }
        .visit-btn:hover .arrow-icon {
          transform: translateX(4px);
        }

        .no-deployment {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin-top: auto;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
