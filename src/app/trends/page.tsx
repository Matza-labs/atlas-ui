'use client';

import { useState, useEffect } from 'react';
import { fetchTrends, type TrendSnapshot } from '@/lib/api';
import { DEMO_SNAPSHOTS } from '@/lib/demo-data';

const METRICS = [
    { key: 'complexity', label: 'Complexity', color: '#f59e0b', lower: true },
    { key: 'fragility', label: 'Fragility', color: '#ef4444', lower: true },
    { key: 'maturity', label: 'Maturity', color: '#10b981', lower: false },
];

function TrendBadge({ delta, improved }: { delta: number; improved: boolean }) {
    const arrow = improved ? '↓' : '↑';
    const color = improved ? '#10b981' : '#ef4444';
    return (
        <span style={{ color, fontWeight: 700, fontSize: '0.9rem' }}>
            {arrow} {Math.abs(delta).toFixed(1)}
        </span>
    );
}

function MiniChart({ data, metricKey, color }: { data: TrendSnapshot[]; metricKey: string; color: string }) {
    const values = data.map((d) => (d as unknown as Record<string, number>)[metricKey]);
    const max = Math.max(...values, 100);
    const width = 400;
    const height = 80;

    const points = values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - (v / max) * height;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
            {values.map((v, i) => {
                const x = (i / (values.length - 1)) * width;
                const y = height - (v / max) * height;
                return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
            })}
        </svg>
    );
}

export default function TrendsPage() {
    const [data, setData] = useState<TrendSnapshot[]>(DEMO_SNAPSHOTS);
    const [live, setLive] = useState(false);

    useEffect(() => {
        // Try fetching trends for the first available graph
        fetchTrends("default")
            .then((snapshots) => {
                if (snapshots.length > 0) { setData(snapshots); setLive(true); }
            })
            .catch(() => { /* keep demo */ });
    }, []);

    const latest = data[data.length - 1];
    const prev = data[data.length - 2];

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Pipeline Trends
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Track your CI/CD health scores over time
                {!live && (
                    <span style={{ marginLeft: 12, color: '#f59e0b', fontSize: '0.8rem' }}>
                        ⚠ API offline — showing demo data
                    </span>
                )}
            </p>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {METRICS.map((m) => {
                    const curr = (latest as unknown as Record<string, number>)[m.key];
                    const pre = (prev as unknown as Record<string, number>)[m.key];
                    const delta = curr - pre;
                    const improved = m.lower ? delta < 0 : delta > 0;
                    return (
                        <div
                            key={m.key}
                            className="glass-card"
                            style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                {m.label}
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: m.color }}>
                                {curr}
                            </div>
                            <TrendBadge delta={delta} improved={improved} />
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {METRICS.map((m) => (
                    <div key={m.key} className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: m.color }}>
                            {m.label} Score
                        </h3>
                        <MiniChart data={data} metricKey={m.key} color={m.color} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                            {data.map((d) => (
                                <span key={d.date}>{d.date.slice(5)}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
