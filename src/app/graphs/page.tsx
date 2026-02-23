import Link from "next/link";

const DEMO_GRAPHS = [
    { id: "demo-1", name: "Jenkins Monorepo Pipeline", platform: "jenkins", created_at: "2026-02-22T10:00:00Z", nodes: 24, edges: 31 },
    { id: "demo-2", name: "GitLab CI/CD Stack", platform: "gitlab", created_at: "2026-02-22T11:30:00Z", nodes: 18, edges: 22 },
    { id: "demo-3", name: "GitHub Actions CI", platform: "github_actions", created_at: "2026-02-22T12:45:00Z", nodes: 12, edges: 15 },
];

export default function GraphsListPage() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
                        <span className="gradient-text">CI/CD Graphs</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
                        Browse and inspect analyzed pipeline architectures
                    </p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                {DEMO_GRAPHS.map((g) => (
                    <Link href={`/graphs/${g.id}`} key={g.id} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12,
                                    background: "var(--accent-glow)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 24,
                                }}>
                                    {g.platform === "jenkins" ? "🏗️" : g.platform === "gitlab" ? "🦊" : "🐙"}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{g.name}</h3>
                                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                                        <span className={`badge badge-info`} style={{ marginRight: 8 }}>{g.platform}</span>
                                        {new Date(g.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                                <div style={{ textAlign: "center" }}>
                                    <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{g.nodes}</p>
                                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Nodes</p>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{g.edges}</p>
                                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Edges</p>
                                </div>
                                <span style={{ fontSize: 20, color: "var(--text-secondary)" }}>→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
