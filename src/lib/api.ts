const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "default";

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            "X-Tenant-Id": TENANT_ID,
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || "dev"}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
    return res.json();
}

export interface GraphSummary {
    id: string;
    name: string;
    platform: string | null;
    created_at: string;
    node_count?: number;
    edge_count?: number;
}

export interface GraphData {
    id: string;
    name: string;
    platform: string | null;
    nodes: Array<{ id: string; node_type: string; name: string; metadata?: Record<string, unknown> }>;
    edges: Array<{ source_node_id: string; target_node_id: string; edge_type: string }>;
}

export interface ReportData {
    graph_id: string;
    name: string;
    platform: string | null;
    scores: { complexity_score: number; fragility_score: number; overall_health: string };
    findings: Array<{ rule_id: string; severity: string; message: string }>;
}

export interface ProposalData {
    id: string;
    title: string;
    status: string;
    author: string;
    suggestion_count: number;
    created_at: string;
}

export interface TrendSnapshot {
    date: string;
    complexity: number;
    fragility: number;
    maturity: number;
    findings: number;
}

export async function fetchGraphs(): Promise<GraphSummary[]> {
    return apiFetch<GraphSummary[]>("/api/v1/graphs/");
}

export async function fetchGraph(id: string): Promise<GraphData> {
    return apiFetch<GraphData>(`/api/v1/graphs/${id}`);
}

export async function fetchReport(graphId: string): Promise<ReportData> {
    return apiFetch<ReportData>(`/api/v1/reports/${graphId}`);
}

export async function fetchProposals(): Promise<ProposalData[]> {
    return apiFetch<ProposalData[]>("/api/v1/proposals");
}

export async function fetchTrends(graphName: string): Promise<TrendSnapshot[]> {
    return apiFetch<TrendSnapshot[]>(`/api/v1/trends/${encodeURIComponent(graphName)}`);
}

export interface BillingData {
    plan_tier: string;
    scans_count: number;
    token_count: number;
}

export async function fetchBillingStatus(): Promise<BillingData> {
    return apiFetch<BillingData>("/api/v1/billing/status");
}
