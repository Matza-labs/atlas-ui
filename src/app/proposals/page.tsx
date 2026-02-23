'use client';

import { useState } from 'react';

/* ── Demo data ── */
const DEMO_PROPOSALS = [
    {
        id: 'p-001',
        title: 'Add timeouts to all build jobs',
        status: 'pending',
        author: 'yoad',
        suggestion_count: 4,
        created_at: '2026-02-23',
    },
    {
        id: 'p-002',
        title: 'Pin container images to SHA digests',
        status: 'approved',
        author: 'yoad',
        suggestion_count: 2,
        created_at: '2026-02-22',
    },
    {
        id: 'p-003',
        title: 'Enable dependency caching',
        status: 'draft',
        author: 'admin',
        suggestion_count: 3,
        created_at: '2026-02-21',
    },
    {
        id: 'p-004',
        title: 'Restrict secret access scopes',
        status: 'rejected',
        author: 'yoad',
        suggestion_count: 1,
        created_at: '2026-02-20',
    },
];

const STATUS_COLORS: Record<string, string> = {
    draft: '#6b7280',
    pending: '#f59e0b',
    approved: '#10b981',
    rejected: '#ef4444',
};

export default function ProposalsPage() {
    const [filter, setFilter] = useState('all');

    const filtered =
        filter === 'all'
            ? DEMO_PROPOSALS
            : DEMO_PROPOSALS.filter((p) => p.status === filter);

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Refactor Proposals
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Track and approve CI/CD modernization plans
            </p>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {['all', 'draft', 'pending', 'approved', 'rejected'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            textTransform: 'capitalize',
                            background: filter === s ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
                            color: filter === s ? '#a5b4fc' : '#94a3b8',
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Proposals list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.map((p) => (
                    <div
                        key={p.id}
                        className="glass-card"
                        style={{ padding: '1.5rem', borderRadius: '12px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    {p.title}
                                </h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                    by {p.author} · {p.created_at} · {p.suggestion_count} suggestion(s)
                                </p>
                            </div>
                            <span
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    color: '#fff',
                                    background: STATUS_COLORS[p.status] || '#6b7280',
                                }}
                            >
                                {p.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
