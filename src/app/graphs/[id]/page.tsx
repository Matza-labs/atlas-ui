"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const GraphViewer = dynamic(() => import("@/components/GraphViewer"), { ssr: false });

// Demo data for the graph detail view
const DEMO_NODES = [
    { id: "p1", node_type: "pipeline", name: "CI Workflow" },
    { id: "j1", node_type: "job", name: "Build" },
    { id: "j2", node_type: "job", name: "Test" },
    { id: "j3", node_type: "job", name: "Deploy" },
    { id: "s1", node_type: "step", name: "Checkout Code" },
    { id: "s2", node_type: "step", name: "Compile" },
    { id: "s3", node_type: "step", name: "Run Unit Tests" },
    { id: "s4", node_type: "step", name: "Deploy to Staging" },
    { id: "e1", node_type: "environment", name: "staging" },
    { id: "sr1", node_type: "secret_ref", name: "DEPLOY_KEY" },
];

const DEMO_EDGES = [
    { source_node_id: "p1", target_node_id: "j1", edge_type: "calls" },
    { source_node_id: "p1", target_node_id: "j2", edge_type: "calls" },
    { source_node_id: "p1", target_node_id: "j3", edge_type: "calls" },
    { source_node_id: "j1", target_node_id: "s1", edge_type: "calls" },
    { source_node_id: "j1", target_node_id: "s2", edge_type: "calls" },
    { source_node_id: "j2", target_node_id: "s3", edge_type: "calls" },
    { source_node_id: "j3", target_node_id: "s4", edge_type: "calls" },
    { source_node_id: "j2", target_node_id: "j1", edge_type: "depends_on" },
    { source_node_id: "j3", target_node_id: "j2", edge_type: "depends_on" },
    { source_node_id: "j3", target_node_id: "e1", edge_type: "deploys_to" },
    { source_node_id: "s4", target_node_id: "sr1", edge_type: "consumes" },
];

export default function GraphDetailPage() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <Link href="/graphs" style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none" }}>
                        ← Back to Graphs
                    </Link>
                    <h1 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 0 0" }}>
                        <span className="gradient-text">CI Workflow</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        <span className="badge badge-info">github_actions</span>
                        <span style={{ marginLeft: 12 }}>{DEMO_NODES.length} nodes · {DEMO_EDGES.length} edges</span>
                    </p>
                </div>
                <Link href={`/reports/demo-1`} style={{ textDecoration: "none" }}>
                    <button style={{
                        background: "var(--accent)", color: "white", border: "none",
                        padding: "12px 24px", borderRadius: 12, fontWeight: 600,
                        cursor: "pointer", fontSize: 14,
                    }}>
                        View Report →
                    </button>
                </Link>
            </div>

            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Interactive Pipeline Graph</h2>
                <GraphViewer nodes={DEMO_NODES} edges={DEMO_EDGES} />
            </div>

            {/* Legend */}
            <div className="glass-card">
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Node Types</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {[
                        { type: "pipeline", color: "#6366f1" },
                        { type: "job", color: "#3b82f6" },
                        { type: "step", color: "#22c55e" },
                        { type: "environment", color: "#f59e0b" },
                        { type: "secret_ref", color: "#ef4444" },
                    ].map((t) => (
                        <div key={t.type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 12, height: 12, borderRadius: 4, background: t.color }} />
                            <span style={{ fontSize: 12, textTransform: "capitalize" }}>{t.type.replace("_", " ")}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
