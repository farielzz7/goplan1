"use client";

import { useEffect, useRef, useState } from 'react';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { usePresetToken } from '@/hooks/use-preset-token';
import { Loader2, AlertCircle } from 'lucide-react';

interface PresetDashboardProps {
    dashboardId?: string;
    title?: string;
    description?: string;
}

export function PresetDashboard({
    dashboardId,
    title = "Dashboard de Analytics",
    description = "Dashboard embebido de Preset"
}: PresetDashboardProps) {
    const { token, loading, error } = usePresetToken();
    const containerRef = useRef<HTMLDivElement>(null);
    const [embedError, setEmbedError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !containerRef.current) return;

        const presetUrl = process.env.NEXT_PUBLIC_PRESET_URL || 'https://cc1aaa1f.us2a.app.preset.io';
        const finalDashboardId = dashboardId || process.env.NEXT_PUBLIC_PRESET_DASHBOARD_ID || '1acebe81-fe70-4e25-8a5a-db463ca46b36';

        // Limpiar el contenedor antes de embeber
        containerRef.current.innerHTML = '';

        try {
            embedDashboard({
                id: finalDashboardId,
                supersetDomain: presetUrl,
                mountPoint: containerRef.current,
                fetchGuestToken: () => Promise.resolve(token),
                dashboardUiConfig: {
                    hideTitle: false,
                    hideChartControls: false,
                    hideTab: false,
                },
            });
            setEmbedError(null);
        } catch (err) {
            setEmbedError(err instanceof Error ? err.message : 'Error al embeber el dashboard');
            console.error('Error embedding dashboard:', err);
        }
    }, [token, dashboardId]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 180px)' }}>
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-lg text-muted-foreground">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || embedError) {
        return (
            <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 180px)' }}>
                <div className="text-center max-w-md">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                    <p className="text-lg text-destructive font-semibold mb-2">Error al cargar el dashboard</p>
                    <p className="text-sm text-muted-foreground">{error || embedError}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full rounded-lg overflow-hidden border bg-white shadow-sm preset-dashboard-container"
            style={{
                height: 'calc(100vh - 180px)',
                minHeight: '600px'
            }}
        />
    );
}
