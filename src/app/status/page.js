'use client';

import React, { useState, useEffect } from 'react';
import StatusHeader from '../../components/vercel/StatusHeader';
import ProjectStatusCard from '../../components/vercel/ProjectStatusCard';

export default function StatusPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVercelStatus() {
      try {
        const response = await fetch('/api/vercel');
        if (!response.ok) {
          let errorMessage = 'Failed to fetch status data';
          try {
            const errorData = await response.json();
            if (errorData.error) errorMessage = errorData.error;
          } catch (e) { } // Ignore JSON parse errors for non-JSON responses
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error fetching Vercel status:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVercelStatus();

    // Refresh every minute
    const interval = setInterval(fetchVercelStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-page-container">
      <div className="content-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-container">
              <div className="spinner outer"></div>
              <div className="spinner inner"></div>
            </div>
            <h2 className="loading-text">Synthesizing Status...</h2>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon-container">
              <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="error-title">Connection Interrupted</h2>
            <p className="error-desc">Unable to establish secure connection to Vercel telemetry. Please verify your token configuration.</p>
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div className="reveal-fade active">
            <StatusHeader projects={projects} />

            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={project.id} className="reveal-up active" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectStatusCard project={project} />
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="empty-state glass-panel">
                <p>No active streams detected. Deploy a project to Vercel to monitor its status here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dynamic gradient overlay at bottom for depth */}
      <div className="bottom-gradient" />

      <style jsx>{`
        .status-page-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          padding-top: calc(var(--nav-height) + 40px);
          padding-bottom: 80px;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 60vh;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          gap: 2rem;
        }

        .spinner-container {
          position: relative;
          width: 5rem;
          height: 5rem;
        }

        .spinner {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 4px solid transparent;
        }

        .spinner.outer {
          border-top-color: var(--clr-secondary);
          animation: spin 1s linear infinite;
        }

        .spinner.inner {
          inset: 0.5rem;
          border-right-color: var(--clr-primary);
          animation: spin-reverse 1.5s linear infinite;
        }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 600;
          background: linear-gradient(to right, var(--clr-secondary), var(--clr-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          gap: 1rem;
          text-align: center;
        }

        .error-icon-container {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          background: rgba(248, 113, 113, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .error-icon {
          width: 3rem;
          height: 3rem;
          color: #f87171;
        }

        .error-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--clr-text-main);
        }

        .error-desc {
          color: var(--clr-text-muted);
          max-width: 400px;
        }

        .error-message {
          color: rgba(248, 113, 113, 0.8);
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .empty-state {
          text-align: center;
          color: var(--clr-text-muted);
          padding: 5rem 2rem;
          border-radius: 1.5rem;
          margin-top: 3rem;
          font-size: 1.25rem;
        }

        .bottom-gradient {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 12rem;
          background: linear-gradient(to top, var(--clr-bg-base) 0%, rgba(10,10,15,0.8) 50%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes pulse {
          50% { opacity: .5; }
        }
      `}</style>
    </div >
  );
}
