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

export default async function DashboardPage() {
  const { graphs, live } = await getGraphs();
  const avgComplexity = 58;
  const avgFragility = 32;
  const totalFindings = 7;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
          CI/CD Architecture Intelligence Overview
          {!live && (
            <span style={{ marginLeft: 12, color: "var(--warning)", fontSize: 12 }}>
              ⚠ API offline — showing demo data
            </span>
          )}
        </p>
      </div>

      {/* Score Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
        <div className="glass-card pulse-glow" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Graphs Analyzed</p>
          <p className="gradient-text" style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            {graphs.length}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Avg. Complexity</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--warning)" }}>
            {avgComplexity}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Avg. Fragility</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--success)" }}>
            {avgFragility}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Active Findings</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--danger)" }}>
            {totalFindings}
          </p>
        </div>
      </div>

      {/* Recent Graphs */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Recent Scans</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {graphs.map((g) => (
            <Link href={`/graphs/${g.id}`} key={g.id} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="glass-card" style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span className="badge badge-info">{g.platform}</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {new Date(g.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{g.name}</h3>
                {(g.node_count !== undefined) && (
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>
                    {g.node_count} nodes · {g.edge_count} edges
                  </p>
                )}
                <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                  Click to view graph →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Supported Platforms</h2>
        <div style={{ display: "flex", gap: 16 }}>
          {["Jenkins", "GitLab CI", "GitHub Actions", "Azure DevOps", "Bitbucket"].map((p) => (
            <div key={p} className="glass-card" style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: 20, margin: "0 0 8px 0" }}>
                {p === "Jenkins" ? "🏗️" : p === "GitLab CI" ? "🦊" : p === "GitHub Actions" ? "🐙" : p === "Azure DevOps" ? "☁️" : "🪣"}
              </p>
              <p style={{ fontWeight: 600, margin: 0, fontSize: 13 }}>{p}</p>
              <p style={{ fontSize: 12, color: "var(--success)", marginTop: 4 }}>● Supported</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
