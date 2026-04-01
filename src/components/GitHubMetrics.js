"use client";

import { useEffect, useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
                background: "#c0c0c0",
                boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #404040, inset 2px 2px 0 #d4d0c8",
                padding: "6px 10px",
                fontFamily: "'Tahoma','Arial',sans-serif",
                fontSize: 11,
            }}>
                <div style={{ fontWeight: "bold", color: "#000", marginBottom: 2 }}>{label}</div>
                <div style={{ color: "#000080" }}>
                    {payload[0].value} commits
                </div>
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
            chartData: chartData.slice(-6), // Only show the last 6 months on the graph
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
            <div style={{ padding: 8, fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={14} />
                Loading GitHub data...
            </div>
        );
    }

    if (!data) {
        return (
            <div style={{ padding: 8, fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: "#444" }}>
                Unable to load GitHub data.
            </div>
        );
    }

    return (
        <ErrorBoundary fallback={<div style={{ padding: 8, fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: "#444" }}>Component Error</div>}>
            <div className="github-metrics-win">
                
                {/* Chart Card */}
                <div className="github-chart-card">
                    <div className="github-chart-header">
                        <Activity size={14} style={{ color: "#000080" }} />
                        <span style={{ fontSize: 11, fontWeight: "bold", color: "#000" }}>
                            GitHub Impact — Recent monthly contributions for @{username}
                        </span>
                    </div>

                    <div className="github-chart-area">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000080" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#000080" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#808080" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dy={8}
                                    fontFamily="'Tahoma','Arial',sans-serif"
                                />
                                <YAxis 
                                    stroke="#808080" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    fontFamily="'Tahoma','Arial',sans-serif"
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#808080', strokeWidth: 1, strokeDasharray: '2 2' }} />
                                <Area 
                                    type="monotone" 
                                    dataKey="commits" 
                                    stroke="#000080" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorCommits)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="github-stats-grid">
                    <StatCard 
                        icon={<GitCommit size={14} style={{color: "#000080"}} />}
                        label="Total Commits"
                        value={stats?.total || 0}
                        subtext="Last 365 days"
                    />
                    <StatCard 
                        icon={<Flame size={14} style={{color: "#f97316"}} />}
                        label="Last 30 Days"
                        value={stats?.last30Days || 0}
                        subtext="Recent momentum"
                    />
                    <StatCard 
                        icon={<Trophy size={14} style={{color: "#eab308"}} />}
                        label="Best Month"
                        value={stats?.bestMonthCommits || 0}
                        subtext={stats?.bestMonth || "N/A"}
                    />
                    <StatCard 
                        icon={<Activity size={14} style={{color: "#3b82f6"}} />}
                        label="Monthly Avg"
                        value={stats?.avgPerMonth || 0}
                        subtext="Commits per month"
                    />
                </div>
            </div>

            <style jsx global>{`
                .github-metrics-win {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .github-chart-card {
                    background: #c0c0c0;
                    box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff;
                    padding: 8px;
                    font-family: 'Tahoma','Arial',sans-serif;
                }
                .github-chart-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 8px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid #808080;
                }
                .github-chart-area {
                    background: #ffffff;
                    box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff;
                    padding: 8px;
                }
                .github-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 6px;
                }
                .github-stat-card {
                    background: #c0c0c0;
                    box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff;
                    padding: 8px 10px;
                    font-family: 'Tahoma','Arial',sans-serif;
                    font-size: 11px;
                }
                .github-stat-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 6px;
                }
                .github-stat-label {
                    font-size: 10px;
                    color: #444;
                    font-weight: bold;
                }
                .github-stat-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #000;
                    line-height: 1;
                    margin-bottom: 2px;
                }
                .github-stat-subtext {
                    font-size: 9px;
                    color: #666;
                }
                @media (max-width: 640px) {
                    .github-stats-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </ErrorBoundary>
    );
}

function StatCard({ icon, label, value, subtext }) {
    return (
        <div className="github-stat-card">
            <div className="github-stat-header">
                {icon}
                <span className="github-stat-label">{label}</span>
            </div>
            <div className="github-stat-value">{value}</div>
            <div className="github-stat-subtext">{subtext}</div>
        </div>
    );
}
