import Link from "next/link";
import ScoreCards from "@/components/ScoreCards";
import FindingsTable from "@/components/FindingsTable";

const DEMO_REPORT = {
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

export default function ReportPage() {
    const report = DEMO_REPORT;

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <Link href={`/graphs/${report.graph_id}`} style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none" }}>
                    ← Back to Graph
                </Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 0 0" }}>
                    <span className="gradient-text">Analysis Report</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                    {report.name} · <span className="badge badge-info">{report.platform}</span>
                </p>
            </div>

            <div style={{ marginBottom: 32 }}>
                <ScoreCards
                    complexity={report.scores.complexity_score}
                    fragility={report.scores.fragility_score}
                    health={report.scores.overall_health}
                />
            </div>

            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                    Findings ({report.findings.length})
                </h2>
                <FindingsTable findings={report.findings} />
            </div>

            {/* Improvement Recommendations */}
            <div className="glass-card" style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                    💡 Top Recommendations
                </h3>
                <ul style={{ paddingLeft: 20, lineHeight: 2, color: "var(--text-secondary)", fontSize: 14 }}>
                    <li>Pin the Docker base image in the Deploy step to a specific SHA digest</li>
                    <li>Add a <code style={{ color: "var(--accent)" }}>timeout-minutes</code> to all jobs</li>
                    <li>Enable dependency caching to speed up the Test job</li>
                    <li>Add a <code style={{ color: "var(--accent)" }}>RUNBOOK.md</code> for operational documentation</li>
                </ul>
            </div>
        </div>
    );
}
