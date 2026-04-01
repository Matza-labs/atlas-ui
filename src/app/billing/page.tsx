import { fetchBillingStatus, type BillingData } from "@/lib/api";

export default async function BillingPage() {
    let billing: BillingData = { plan_tier: "free", scans_count: 0, token_count: 0 };
    let live = false;

    try {
        billing = await fetchBillingStatus();
        live = true;
    } catch {
        // Fallback demo data
        billing = { plan_tier: "pro", scans_count: 125, token_count: 450000 };
    }

    const limits = {
        free: { scans: 50, tokens: 100000 },
        pro: { scans: 500, tokens: 2000000 },
        enterprise: { scans: Infinity, tokens: Infinity },
    };

    const currentLimit = limits[billing.plan_tier as keyof typeof limits] || limits.free;
    const scanPercentage = currentLimit.scans === Infinity ? 0 : (billing.scans_count / currentLimit.scans) * 100;
    const tokenPercentage = currentLimit.tokens === Infinity ? 0 : (billing.token_count / currentLimit.tokens) * 100;

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
                    <span className="gradient-text">Billing & Usage</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 14 }}>
                    Manage your subscription and monitor usage limits.
                    {!live && (
                        <span style={{ marginLeft: 12, color: "var(--warning)", fontSize: 12 }}>
                            ⚠ API offline — showing demo data
                        </span>
                    )}
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
                <div className="glass-card pulse-glow" style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: 18 }}>Current Plan</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <span style={{ fontSize: 32 }}>⭐</span>
                        <div>
                            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, textTransform: "capitalize" }}>
                                {billing.plan_tier}
                            </p>
                            <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)" }}>
                                {billing.plan_tier === "free" ? "$0/month" : billing.plan_tier === "pro" ? "$49/month" : "Custom Pricing"}
                            </p>
                        </div>
                    </div>
                    {billing.plan_tier !== "enterprise" && (
                        <button style={{ width: "100%", background: "var(--success)", color: "#000", border: "none", padding: "10px 16px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
                            Upgrade Plan
                        </button>
                    )}
                </div>

                <div className="glass-card" style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: 18 }}>Monthly Scans</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span>{billing.scans_count.toLocaleString()} used</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                            {currentLimit.scans === Infinity ? "Unlimited" : `${currentLimit.scans.toLocaleString()} limit`}
                        </span>
                    </div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                            height: "100%",
                            width: `${Math.min(100, scanPercentage)}%`,
                            background: scanPercentage > 90 ? "var(--danger)" : "var(--primary)",
                            transition: "width 0.3s ease"
                        }} />
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: 18 }}>AI Intelligence Tokens</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span>{billing.token_count.toLocaleString()} used</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                            {currentLimit.tokens === Infinity ? "Unlimited" : `${currentLimit.tokens.toLocaleString()} limit`}
                        </span>
                    </div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                            height: "100%",
                            width: `${Math.min(100, tokenPercentage)}%`,
                            background: tokenPercentage > 90 ? "var(--warning)" : "var(--secondary)",
                            transition: "width 0.3s ease"
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
