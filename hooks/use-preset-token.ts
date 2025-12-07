import { useState, useEffect } from 'react';

interface UsePresetTokenResult {
    token: string | null;
    loading: boolean;
    error: string | null;
}

export function usePresetToken(): UsePresetTokenResult {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/preset/guest-token');

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch token');
                }

                const data = await response.json();
                setToken(data.token);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                console.error('Error fetching Preset token:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();

        // Refrescar el token cada 5 minutos (los tokens de Preset generalmente expiran en 5-10 min)
        const interval = setInterval(fetchToken, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { token, loading, error };
}
