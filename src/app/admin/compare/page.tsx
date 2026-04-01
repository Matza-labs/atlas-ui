import Link from "next/link";

interface TenantStat {
    name: string;
    plan: string;
    scans: number;
    tokens: number;
}

export default async function AdminComparePage() {
    let tenants: TenantStat[] = [];
    let live = false;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/cross-org-stats`, {
            headers: {
                "admin-secret": "pipelineatlas-admin-secret"
            },
            cache: "no-store"
        });
        if (res.ok) {
            const data = await res.json();
            tenants = data.tenants || [];
            live = true;
        } else {
            throw new Error("Failed to fetch");
        }
    } catch {
        // Fallback demo data
        tenants = [
            { name: "Acme Corp", plan: "enterprise", scans: 1450, tokens: 1200000 },
            { name: "Globex", plan: "pro", scans: 430, tokens: 450000 },
            { name: "Initech", plan: "free", scans: 45, tokens: 90000 },
            { name: "Umbrella", plan: "pro", scans: 210, tokens: 150000 },
        ];
    }

    const maxScans = Math.max(...tenants.map((t: TenantStat) => t.scans), 1);
    const maxTokens = Math.max(...tenants.map((t: TenantStat) => t.tokens), 1);

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <Link href="/" style={{ color: "var(--primary)", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "inline-block" }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
                    <span className="gradient-text">Admin: Org Comparison</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
                    Cross-tenant usage and maturity metrics.
                    {!live && (
                        <span style={{ marginLeft: 12, color: "var(--warning)", fontSize: 12 }}>
                            ⚠ API offline — showing demo data
                        </span>
                    )}
                </p>
            </div>

            <div className="glass-card" style={{ padding: "24px 32px" }}>
                <h3 style={{ margin: "0 0 24px 0", fontSize: 18 }}>Tenant Usage Leaderboard</h3>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 3fr 3fr", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12, marginBottom: 16, color: "var(--text-secondary)", fontSize: 13, fontWeight: 600, textTransform: "uppercase" }}>
                    <div>Organization</div>
                    <div>Plan</div>
                    <div>Scans Used</div>
                    <div>AI Tokens Used</div>
                </div>

                {tenants.map((t: TenantStat, idx: number) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 3fr 3fr", gap: 16, alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ fontWeight: 600 }}>{t.name}</div>
                        <div>
                            <span className={`badge ${t.plan === 'enterprise' ? 'badge-success' : t.plan === 'pro' ? 'badge-primary' : 'badge-info'}`} style={{ textTransform: "capitalize" }}>
                                {t.plan}
                            </span>
                        </div>

                        {/* Scans Bar */}
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                                <span>{t.scans.toLocaleString()}</span>
                            </div>
                            <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${(t.scans / maxScans) * 100}%`, background: "var(--primary)" }} />
                            </div>
                        </div>

                        {/* Tokens Bar */}
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                                <span>{t.tokens.toLocaleString()}</span>
                            </div>
                            <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${(t.tokens / maxTokens) * 100}%`, background: "var(--success)" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
