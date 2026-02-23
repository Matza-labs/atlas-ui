interface ScoreCardsProps {
    complexity: number;
    fragility: number;
    health: string;
}

function getScoreClass(score: number): string {
    if (score <= 40) return "score-good";
    if (score <= 70) return "score-medium";
    return "score-bad";
}

export default function ScoreCards({ complexity, fragility, health }: ScoreCardsProps) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div className={`score-gauge ${getScoreClass(complexity)}`}>
                    {complexity.toFixed(0)}
                </div>
                <div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Complexity</p>
                    <p style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 0 0" }}>
                        {complexity <= 40 ? "Low" : complexity <= 70 ? "Medium" : "High"}
                    </p>
                </div>
            </div>

            <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div className={`score-gauge ${getScoreClass(fragility)}`}>
                    {fragility.toFixed(0)}
                </div>
                <div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Fragility</p>
                    <p style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 0 0" }}>
                        {fragility <= 40 ? "Low" : fragility <= 70 ? "Medium" : "High"}
                    </p>
                </div>
            </div>

            <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div className="score-gauge score-good" style={{ fontSize: 36 }}>
                    {health === "good" ? "✓" : health === "warning" ? "!" : "✗"}
                </div>
                <div>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Overall Health</p>
                    <p style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 0 0", textTransform: "capitalize" }}>
                        {health}
                    </p>
                </div>
            </div>
        </div>
    );
}
