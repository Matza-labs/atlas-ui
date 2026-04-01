import Link from "next/link";
import { fetchGraphs, type GraphSummary } from "@/lib/api";
import { DEMO_GRAPHS } from "@/lib/demo-data";

async function getGraphs(): Promise<{ graphs: GraphSummary[]; live: boolean }> {
    try {
        const graphs = await fetchGraphs();
        return { graphs, live: true };
    } catch {
        return { graphs: DEMO_GRAPHS, live: false };
    }
}

export default async function GraphsListPage() {
    const { graphs, live } = await getGraphs();

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
                        <span className="gradient-text">CI/CD Graphs</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
                        Browse and inspect analyzed pipeline architectures
                        {!live && (
                            <span style={{ marginLeft: 12, color: "var(--warning)", fontSize: 12 }}>
                                ⚠ API offline — showing demo data
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                {graphs.map((g) => (
                    <Link href={`/graphs/${g.id}`} key={g.id} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12,
                                    background: "var(--accent-glow)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 24,
                                }}>
                                    {g.platform === "jenkins" ? "🏗️" : g.platform === "gitlab" ? "🦊" : g.platform === "github_actions" ? "🐙" : g.platform === "azure_devops" ? "☁️" : "🪣"}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{g.name}</h3>
                                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                                        <span className="badge badge-info" style={{ marginRight: 8 }}>{g.platform}</span>
                                        {new Date(g.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                                {g.node_count !== undefined && (
                                    <>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{g.node_count}</p>
                                            <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Nodes</p>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{g.edge_count}</p>
                                            <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Edges</p>
                                        </div>
                                    </>
                                )}
                                <span style={{ fontSize: 20, color: "var(--text-secondary)" }}>→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
