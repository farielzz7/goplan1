"use client";

import { PresetDashboard } from "@/components/preset-dashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function PresetDashboardPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <div className="flex-1 flex flex-col p-4 gap-3">
                {/* Header compacto */}
                <div className="flex items-center justify-between bg-white rounded-lg shadow-sm px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-primary" />
                            <h1 className="text-xl font-bold tracking-tight">Dashboard de Analytics</h1>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        GoPlan - Estadísticas en tiempo real
                    </div>
                </div>

                {/* Dashboard - Ocupa todo el espacio disponible */}
                <div className="flex-1">
                    <PresetDashboard
                        title="Estadísticas de GoPlan"
                        description="Dashboard de análisis de datos de turismo y viajes"
                    />
                </div>
            </div>
        </div>
    );
}
