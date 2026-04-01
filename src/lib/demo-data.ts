/**
 * Shared demo/fallback data for all UI pages.
 *
 * When the atlas-api backend is offline, pages gracefully fall back
 * to these static datasets so the UI is always demonstrable.
 */

import type { GraphSummary } from "@/lib/api";

// ── Dashboard & Graphs ──────────────────────────────────────────────

export const DEMO_GRAPHS: GraphSummary[] = [
    {
        id: "demo-1",
        name: "Jenkins Monorepo Pipeline",
        platform: "jenkins",
        created_at: "2026-02-22T10:00:00Z",
        node_count: 24,
        edge_count: 31,
    },
    {
        id: "demo-2",
        name: "GitLab CI/CD Stack",
        platform: "gitlab",
        created_at: "2026-02-22T11:30:00Z",
        node_count: 18,
        edge_count: 22,
    },
    {
        id: "demo-3",
        name: "GitHub Actions CI",
        platform: "github_actions",
        created_at: "2026-02-22T12:45:00Z",
        node_count: 12,
        edge_count: 15,
    },
];

// ── Graph Detail ────────────────────────────────────────────────────

export interface GraphData {
    id: string;
    name: string;
    platform: string;
    nodes: Array<{ id: string; type: string; label: string }>;
    edges: Array<{ source: string; target: string; type: string }>;
}

export const DEMO_GRAPH: GraphData = {
    id: "demo-1",
    name: "Jenkins Monorepo Pipeline",
    platform: "jenkins",
    nodes: [
        { id: "n1", type: "pipeline", label: "Main Pipeline" },
        { id: "n2", type: "stage", label: "Build" },
        { id: "n3", type: "stage", label: "Test" },
        { id: "n4", type: "stage", label: "Deploy" },
        { id: "n5", type: "step", label: "mvn compile" },
        { id: "n6", type: "step", label: "mvn test" },
        { id: "n7", type: "step", label: "kubectl apply" },
    ],
    edges: [
        { source: "n1", target: "n2", type: "triggers" },
        { source: "n2", target: "n3", type: "triggers" },
        { source: "n3", target: "n4", type: "triggers" },
        { source: "n2", target: "n5", type: "calls" },
        { source: "n3", target: "n6", type: "calls" },
        { source: "n4", target: "n7", type: "calls" },
    ],
};

// ── Report Detail ───────────────────────────────────────────────────

export interface ReportData {
    graph_id: string;
    graph_name: string;
    complexity: number;
    fragility: number;
    maturity: number;
    findings: Array<{
        rule_id: string;
        severity: string;
        title: string;
        description: string;
    }>;
}

export const DEMO_REPORT: ReportData = {
    graph_id: "demo-1",
    graph_name: "Jenkins Monorepo Pipeline",
    complexity: 58,
    fragility: 32,
    maturity: 66,
    findings: [
        {
            rule_id: "no-timeout",
            severity: "HIGH",
            title: "Missing Timeout",
            description: "Pipeline has no timeout configured.",
        },
        {
            rule_id: "unpinned-images",
            severity: "HIGH",
            title: "Unpinned Container Images",
            description: "Using :latest tag without digest pinning.",
        },
    ],
};

// ── Trends ──────────────────────────────────────────────────────────

import type { TrendSnapshot } from "@/lib/api";

export const DEMO_SNAPSHOTS: TrendSnapshot[] = [
    {
        date: "2026-01-15",
        complexity: 45,
        fragility: 60,
        maturity: 35,
        findings: 12,
    },
    {
        date: "2026-01-22",
        complexity: 42,
        fragility: 55,
        maturity: 40,
        findings: 10,
    },
    {
        date: "2026-01-29",
        complexity: 40,
        fragility: 48,
        maturity: 45,
        findings: 8,
    },
    {
        date: "2026-02-05",
        complexity: 38,
        fragility: 42,
        maturity: 52,
        findings: 7,
    },
    {
        date: "2026-02-12",
        complexity: 35,
        fragility: 38,
        maturity: 58,
        findings: 5,
    },
    {
        date: "2026-02-19",
        complexity: 33,
        fragility: 35,
        maturity: 65,
        findings: 4,
    },
];

// ── Proposals ───────────────────────────────────────────────────────

export interface ProposalData {
    id: string;
    title: string;
    status: string;
    author: string;
    suggestion_count: number;
    created_at: string;
}

export const DEMO_PROPOSALS: ProposalData[] = [
    {
        id: "p1",
        title: "Add timeout to all Jenkins stages",
        status: "approved",
        author: "atlas-rule-engine",
        suggestion_count: 3,
        created_at: "2026-02-22T14:00:00Z",
    },
    {
        id: "p2",
        title: "Pin container image digests",
        status: "pending",
        author: "atlas-rule-engine",
        suggestion_count: 5,
        created_at: "2026-02-22T14:10:00Z",
    },
];
