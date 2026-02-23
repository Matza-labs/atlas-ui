interface Finding {
    rule_id: string;
    severity: string;
    message: string;
}

interface FindingsTableProps {
    findings: Finding[];
}

export default function FindingsTable({ findings }: FindingsTableProps) {
    if (findings.length === 0) {
        return (
            <div className="glass-card" style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                No findings detected — the pipeline is clean! 🎉
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="findings-table">
                <thead>
                    <tr>
                        <th>Severity</th>
                        <th>Rule</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {findings.map((f, i) => (
                        <tr key={i}>
                            <td>
                                <span className={`badge badge-${f.severity}`}>{f.severity}</span>
                            </td>
                            <td style={{ fontFamily: "monospace", fontSize: 13 }}>{f.rule_id}</td>
                            <td>{f.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
