"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Dashboard", icon: "📊" },
        { href: "/graphs", label: "Graphs", icon: "🔗" },
    ];

    return (
        <nav className="sidebar">
            <div style={{ marginBottom: 32 }}>
                <h1 className="gradient-text" style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
                    PipelineAtlas
                </h1>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                    CI/CD Intelligence
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? "active" : ""}
                    >
                        <span>{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
            </div>

            <div style={{ position: "absolute", bottom: 24, left: 16, right: 16 }}>
                <div className="glass-card" style={{ padding: 16, fontSize: 12 }}>
                    <p style={{ color: "var(--text-secondary)", margin: 0 }}>Tenant</p>
                    <p style={{ fontWeight: 600, margin: "4px 0 0 0" }}>default</p>
                </div>
            </div>
        </nav>
    );
}
