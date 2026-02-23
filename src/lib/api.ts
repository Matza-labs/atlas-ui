const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "default";

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            "X-Tenant-Id": TENANT_ID,
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
}

export interface GraphData {
    id: string;
    name: string;
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

export async function fetchGraphs(): Promise<GraphSummary[]> {
    return apiFetch<GraphSummary[]>("/api/v1/graphs/");
}

export async function fetchGraph(id: string): Promise<GraphData> {
    return apiFetch<GraphData>(`/api/v1/graphs/${id}`);
}

export async function fetchReport(graphId: string): Promise<ReportData> {
    return apiFetch<ReportData>(`/api/v1/reports/${graphId}`);
}
