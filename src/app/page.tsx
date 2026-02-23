import Link from "next/link";

// Demo data for when the API isn't running
const DEMO_GRAPHS = [
  { id: "demo-1", name: "Jenkins Monorepo Pipeline", platform: "jenkins", created_at: "2026-02-22T10:00:00Z" },
  { id: "demo-2", name: "GitLab CI/CD Stack", platform: "gitlab", created_at: "2026-02-22T11:30:00Z" },
  { id: "demo-3", name: "GitHub Actions CI", platform: "github_actions", created_at: "2026-02-22T12:45:00Z" },
];

const DEMO_SCORES = { complexity: 58, fragility: 32, findings: 7 };

export default function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
          CI/CD Architecture Intelligence Overview
        </p>
      </div>

      {/* Score Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
        <div className="glass-card pulse-glow" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Graphs Analyzed</p>
          <p className="gradient-text" style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            {DEMO_GRAPHS.length}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Avg. Complexity</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--warning)" }}>
            {DEMO_SCORES.complexity}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Avg. Fragility</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--success)" }}>
            {DEMO_SCORES.fragility}
          </p>
        </div>
        <div className="glass-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Active Findings</p>
          <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "var(--danger)" }}>
            {DEMO_SCORES.findings}
          </p>
        </div>
      </div>

      {/* Recent Graphs */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Recent Scans</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {DEMO_GRAPHS.map((g) => (
            <Link href={`/graphs/${g.id}`} key={g.id} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="glass-card" style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span className={`badge badge-info`}>{g.platform}</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {new Date(g.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{g.name}</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>
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
          {["Jenkins", "GitLab CI", "GitHub Actions"].map((p) => (
            <div key={p} className="glass-card" style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: 24, margin: "0 0 8px 0" }}>
                {p === "Jenkins" ? "🏗️" : p === "GitLab CI" ? "🦊" : "🐙"}
              </p>
              <p style={{ fontWeight: 600, margin: 0 }}>{p}</p>
              <p style={{ fontSize: 12, color: "var(--success)", marginTop: 4 }}>● Connected</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
