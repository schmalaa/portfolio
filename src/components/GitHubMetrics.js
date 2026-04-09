"use client";

import { useEffect, useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Activity, Flame, Trophy, GitCommit } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary";

async function fetchContributions(username) {
    try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        if (!response.ok) throw new Error("Failed to fetch");
        return await response.json();
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        return null;
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "rgba(18, 18, 26, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)"
            }}>
                <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginBottom: "4px", fontWeight: "500", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</p>
                <p style={{ color: "#10b981", fontWeight: "bold", fontSize: "1.125rem", margin: 0 }}>
                    {payload[0].value} <span style={{ fontSize: "0.875rem", fontWeight: "normal", color: "#64748b" }}>commits</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function GitHubMetrics({ username = "schmalaa" }) {
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

    const { chartData, stats } = useMemo(() => {
        if (!data || !data.contributions) return { chartData: [], stats: null };

        const flatContributions = data.contributions.flat();
        flatContributions.sort((a, b) => new Date(a.date) - new Date(b.date));

        const today = new Date();
        const year = today.getFullYear();
        const monthStr = String(today.getMonth() + 1).padStart(2, '0');
        const dayStr = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${monthStr}-${dayStr}`;

        const valid = flatContributions.filter(d => d.date <= todayStr);

        const monthlyMap = new Map();
        let total = 0;

        valid.forEach(day => {
            total += day.contributionCount;
            const monthKey = day.date.substring(0, 7);
            monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + day.contributionCount);
        });

        const chartData = Array.from(monthlyMap.entries()).map(([key, count]) => {
            const [y, m] = key.split('-');
            const dateObj = new Date(y, m - 1);
            const monthName = dateObj.toLocaleString('default', { month: 'short' });
            return {
                name: `${monthName} '${y.substring(2)}`,
                commits: count,
            };
        });

        const monthsCount = chartData.length || 1;
        const avgPerMonth = Math.round(total / monthsCount);

        let bestMonth = { name: "N/A", commits: 0 };
        chartData.forEach(d => {
            if (d.commits > bestMonth.commits) {
                bestMonth = d;
            }
        });

        const last30Days = valid.slice(-30).reduce((sum, d) => sum + d.contributionCount, 0);

        return {
            chartData: chartData.slice(-3), // Only show the last 6 months on the graph
            stats: {
                total,
                avgPerMonth,
                bestMonth: bestMonth.name,
                bestMonthCommits: bestMonth.commits,
                last30Days
            }
        };
    }, [data]);

    if (loading) {
        return (
            <div className="metrics-loading glass-panel">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <Activity color="#10b981" size={32} style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                    <p style={{ fontSize: "0.875rem", color: "var(--clr-text-muted)" }}>Loading GitHub Impact...</p>
                </div>
                <style jsx>{`
                    .metrics-loading { width: 100%; height: 400px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
                `}</style>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="metrics-loading glass-panel">
                <p style={{ color: "var(--clr-text-muted)" }}>Unable to load GitHub data.</p>
                <style jsx>{`.metrics-loading { width: 100%; height: 400px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }`}</style>
            </div>
        );
    }

    return (
        <ErrorBoundary fallback={<div style={{ width: "100%", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--clr-text-muted)" }}>Component Error</div>}>
            <div className="metrics-container">

                {/* Header & Main Chart Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="metrics-chart-card glass-panel"
                >
                    <div className="glow-bg" />

                    <div className="metrics-header">
                        <h3 className="metrics-title">
                            <Activity color="#10b981" size={24} />
                            GitHub Impact
                        </h3>
                        <p className="metrics-subtitle">Recent monthly contributions for <span style={{ color: "#10b981" }}>@{username}</span></p>
                    </div>

                    <div className="metrics-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#4b5563"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#4b5563"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCommits)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Metric Cards Grid */}
                <div className="metrics-grid">
                    <MetricCard
                        icon={<GitCommit color="#10b981" size={20} />}
                        label="Total Commits"
                        value={stats?.total || 0}
                        subtext="Last 365 days"
                        delay={0.1}
                    />
                    <MetricCard
                        icon={<Flame color="#f97316" size={20} />}
                        label="Last 30 Days"
                        value={stats?.last30Days || 0}
                        subtext="Recent momentum"
                        delay={0.2}
                    />
                    <MetricCard
                        icon={<Trophy color="#eab308" size={20} />}
                        label="Best Month"
                        value={stats?.bestMonthCommits || 0}
                        subtext={stats?.bestMonth || "N/A"}
                        delay={0.3}
                    />
                    <MetricCard
                        icon={<Activity color="#3b82f6" size={20} />}
                        label="Monthly Avg"
                        value={stats?.avgPerMonth || 0}
                        subtext="Commits per month"
                        delay={0.4}
                    />
                </div>
            </div>

            <style jsx global>{`
                .metrics-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }
                .metrics-chart-card {
                    width: 100%;
                    border-radius: 16px;
                    padding: 32px;
                    position: relative;
                    overflow: hidden;
                    background: rgba(10, 10, 15, 0.6);
                }
                .glow-bg {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 300px;
                    background: rgba(16, 185, 129, 0.08);
                    border-radius: 50%;
                    filter: blur(60px);
                    transform: translate(30%, -50%);
                    pointer-events: none;
                }
                .metrics-header {
                    margin-bottom: 32px;
                }
                .metrics-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--clr-text-main);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .metrics-subtitle {
                    color: var(--clr-text-muted);
                    font-size: 0.95rem;
                    margin: 0;
                }
                .metrics-chart-wrapper {
                    height: 260px;
                    width: 100%;
                    margin-top: 16px;
                }
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }
                .metric-card {
                    display: flex;
                    flex-direction: column;
                    padding: 32px 28px !important;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    background: rgba(10, 10, 15, 0.6);
                    transition: border-color var(--transition-fast), transform var(--transition-fast);
                    cursor: default;
                }
                .metric-card:hover {
                    border-color: rgba(16, 185, 129, 0.4);
                    transform: translateY(-2px);
                }
                .metric-icon-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }
                .metric-icon-box {
                    padding: 8px;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .metric-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--clr-text-muted);
                    margin: 0;
                }
                .metric-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--clr-text-main);
                    margin: 0 0 4px 0;
                    line-height: 1;
                }
                .metric-subtext {
                    font-size: 0.75rem;
                    color: var(--clr-text-muted);
                    margin: 0;
                }
                .metric-hover-glow {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top right, transparent, transparent, rgba(16, 185, 129, 0.1));
                    opacity: 0;
                    transition: opacity var(--transition-fast);
                    pointer-events: none;
                }
                .metric-card:hover .metric-hover-glow {
                    opacity: 1;
                }
                @media (max-width: 640px) {
                    .metrics-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .metrics-chart-card {
                        padding: 24px;
                    }
                    .metric-card {
                        padding: 20px 16px !important;
                    }
                }
            `}</style>
        </ErrorBoundary>
    );
}

function MetricCard({ icon, label, value, subtext, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="metric-card glass-panel"
        >
            <div className="metric-icon-wrap">
                <div className="metric-icon-box">
                    {icon}
                </div>
                <p className="metric-label">{label}</p>
            </div>
            <p className="metric-value">{value}</p>
            <p className="metric-subtext">{subtext}</p>

            <div className="metric-hover-glow" />
        </motion.div>
    );
}
