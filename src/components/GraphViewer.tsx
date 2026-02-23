"use client";

import { ReactFlow, Background, Controls, MiniMap, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface GraphViewerProps {
    nodes: Array<{ id: string; node_type: string; name: string }>;
    edges: Array<{ source_node_id: string; target_node_id: string; edge_type: string }>;
}

const NODE_COLORS: Record<string, string> = {
    pipeline: "#6366f1",
    job: "#3b82f6",
    stage: "#8b5cf6",
    step: "#22c55e",
    secret_ref: "#ef4444",
    environment: "#f59e0b",
    repository: "#06b6d4",
    artifact: "#ec4899",
    container_image: "#14b8a6",
    runner: "#a855f7",
    doc_file: "#64748b",
    external_service: "#f97316",
};

export default function GraphViewer({ nodes: rawNodes, edges: rawEdges }: GraphViewerProps) {
    // Lay out nodes in a grid-like pattern
    const rfNodes: Node[] = rawNodes.map((n, i) => ({
        id: n.id,
        data: {
            label: (
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: NODE_COLORS[n.node_type] || "#6366f1",
                        marginBottom: 4,
                    }}>
                        {n.node_type}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {n.name.length > 30 ? n.name.slice(0, 30) + "…" : n.name}
                    </div>
                </div>
            ),
        },
        position: {
            x: (i % 4) * 280 + 50,
            y: Math.floor(i / 4) * 160 + 50,
        },
        style: {
            background: "var(--bg-surface)",
            border: `2px solid ${NODE_COLORS[n.node_type] || "#6366f1"}`,
            borderRadius: 12,
            padding: "12px 16px",
            color: "var(--text-primary)",
            minWidth: 200,
        },
    }));

    const rfEdges: Edge[] = rawEdges.map((e, i) => ({
        id: `e-${i}`,
        source: e.source_node_id,
        target: e.target_node_id,
        label: e.edge_type,
        animated: e.edge_type === "triggers",
        style: { stroke: "var(--accent)" },
        labelStyle: { fontSize: 10, fill: "var(--text-secondary)" },
    }));

    return (
        <div style={{ width: "100%", height: 600, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
            <ReactFlow
                nodes={rfNodes}
                edges={rfEdges}
                fitView
                attributionPosition="bottom-left"
            >
                <Background color="rgba(99, 102, 241, 0.1)" gap={24} />
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        const nodeType = rawNodes.find(n => n.id === node.id)?.node_type || "";
                        return NODE_COLORS[nodeType] || "#6366f1";
                    }}
                    style={{ background: "var(--bg-surface)" }}
                />
            </ReactFlow>
        </div>
    );
}
