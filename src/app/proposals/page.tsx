'use client';

import { useState, useEffect } from 'react';
import { fetchProposals, type ProposalData } from '@/lib/api';
import { DEMO_PROPOSALS } from '@/lib/demo-data';

const STATUS_COLORS: Record<string, string> = {
    draft: '#6b7280',
    pending: '#f59e0b',
    approved: '#10b981',
    rejected: '#ef4444',
};

export default function ProposalsPage() {
    const [filter, setFilter] = useState('all');
    const [proposals, setProposals] = useState<ProposalData[]>(DEMO_PROPOSALS);
    const [live, setLive] = useState(false);
    const [applying, setApplying] = useState<string | null>(null);

    useEffect(() => {
        fetchProposals()
            .then((data) => { setProposals(data); setLive(true); })
            .catch(() => { /* keep demo data */ });
    }, []);

    const filtered =
        filter === 'all'
            ? proposals
            : proposals.filter((p) => p.status === filter);

    const handleApply = async (id: string) => {
        setApplying(id);
        try {
            const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${url}/api/v1/proposals/${id}/apply`, {
                method: 'POST',
                headers: { 'Authorization': 'ApiKey pipeline-admin-demo' } // simulated admin
            });
            if (res.ok) {
                // Refresh list locally
                setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'applied' } : p));
            } else {
                alert('Failed to apply proposal');
            }
        } catch (e) {
            console.error(e);
            alert('API error');
        } finally {
            setApplying(null);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Refactor Proposals
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Track and approve CI/CD modernization plans
                {!live && (
                    <span style={{ marginLeft: 12, color: '#f59e0b', fontSize: '0.8rem' }}>
                        ⚠ API offline — showing demo data
                    </span>
                )}
            </p>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {['all', 'draft', 'pending', 'approved', 'applied', 'rejected'].map((s) => (
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {p.status === 'approved' && (
                                    <button
                                        onClick={() => handleApply(p.id)}
                                        disabled={applying === p.id}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: '#3b82f6',
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontSize: '0.8rem',
                                            cursor: applying === p.id ? 'wait' : 'pointer',
                                            opacity: applying === p.id ? 0.7 : 1,
                                            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)'
                                        }}
                                    >
                                        {applying === p.id ? 'Applying...' : 'Apply Fixes'}
                                    </button>
                                )}
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
                    </div>
                ))}
            </div>
        </div>
    );
}
