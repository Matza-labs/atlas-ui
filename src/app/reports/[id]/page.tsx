"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import ScoreCards from "@/components/ScoreCards";
import FindingsTable from "@/components/FindingsTable";
import { fetchReport, type ReportData } from "@/lib/api";

const DEMO_REPORT: ReportData = {
    graph_id: "demo-1",
    name: "CI Workflow",
    platform: "github_actions",
    scores: { complexity_score: 58, fragility_score: 32, overall_health: "good" },
    findings: [
        { rule_id: "no-timeout", severity: "medium", message: "Job 'Build' has no timeout configured — risk of indefinite hangs" },
        { rule_id: "unpinned-images", severity: "high", message: "Step 'Deploy to Staging' uses unpinned base image 'node:latest'" },
        { rule_id: "secret-exposure", severity: "critical", message: "Secret DEPLOY_KEY is consumed by a step with shell access" },
        { rule_id: "no-cache", severity: "low", message: "Job 'Test' does not use dependency caching" },
        { rule_id: "missing-docs", severity: "info", message: "No RUNBOOK.md found in the repository" },
        { rule_id: "sequential-stages", severity: "medium", message: "Jobs Build → Test → Deploy run sequentially; consider parallelization" },
        { rule_id: "heavy-shell", severity: "medium", message: "Step 'Compile' executes a complex multi-line shell script" },
    ],
};

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [report, setReport] = useState<ReportData | null>(null);
    const [live, setLive] = useState(false);

    useEffect(() => {
        fetchReport(id)
            .then((r) => { setReport(r); setLive(true); })
            .catch(() => setReport(DEMO_REPORT));
    }, [id]);

    const data = report ?? DEMO_REPORT;

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <Link href={`/graphs/${data.graph_id}`} style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none" }}>
                    ← Back to Graph
                </Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 0 0" }}>
                    <span className="gradient-text">Analysis Report</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                    {data.name} · <span className="badge badge-info">{data.platform}</span>
                    {!live && report && (
                        <span style={{ marginLeft: 12, color: "var(--warning)", fontSize: 12 }}>⚠ demo</span>
                    )}
                </p>
            </div>

            <div style={{ marginBottom: 32 }}>
                <ScoreCards
                    complexity={data.scores.complexity_score}
                    fragility={data.scores.fragility_score}
                    health={data.scores.overall_health}
                />
            </div>

            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                    Findings ({data.findings.length})
                </h2>
                <FindingsTable findings={data.findings} />
            </div>

            <div className="glass-card" style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                    Top Recommendations
                </h3>
                <ul style={{ paddingLeft: 20, lineHeight: 2, color: "var(--text-secondary)", fontSize: 14 }}>
                    {data.findings.slice(0, 4).map((f) => (
                        <li key={f.rule_id}>{f.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
