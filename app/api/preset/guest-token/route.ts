import { NextResponse } from 'next/server';

async function getPresetAccessToken(): Promise<string> {
  const managerUrl = process.env.PRESET_MANAGER_API_URL || 'https://api.app.preset.io';
  const apiKey = process.env.PRESET_API_KEY;
  const apiSecret = process.env.PRESET_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing PRESET_API_KEY or PRESET_API_SECRET');
  }

  // 1) Autenticarse contra el Manager API de Preset
  const authResponse = await fetch(`${managerUrl}/v1/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: apiKey,
      secret: apiSecret,
    }),
  });

  if (!authResponse.ok) {
    const text = await authResponse.text();
    console.error('Preset auth failed:', authResponse.status, text);
    throw new Error(`Preset auth failed: ${authResponse.status}`);
  }

  const authJson = await authResponse.json();

  const accessToken =
    authJson?.payload?.access_token ||
    authJson?.data?.payload?.access_token ||
    authJson?.access_token;

  if (!accessToken) {
    console.error('No access_token in Preset auth response:', authJson);
    throw new Error('No access_token in Preset auth response');
  }

  return accessToken;
}

export async function GET() {
  try {
    const teamId = process.env.PRESET_TEAM_ID;
    const workspaceId = process.env.PRESET_WORKSPACE_ID;
    const embeddedDashboardId = process.env.PRESET_DASHBOARD_ID || process.env.NEXT_PUBLIC_PRESET_DASHBOARD_ID;

    if (!teamId || !workspaceId || !embeddedDashboardId) {
      return NextResponse.json(
        {
          error: 'Missing PRESET_TEAM_ID, PRESET_WORKSPACE_ID or PRESET_DASHBOARD_ID',
        },
        { status: 500 },
      );
    }

    const managerUrl = process.env.PRESET_MANAGER_API_URL || 'https://api.app.preset.io';

    // 1) Sacar access_token del Manager API
    const accessToken = await getPresetAccessToken();

    // 2) Pedir guest token para ese dashboard
    const payload = {
      user: {
        username: 'guest_user',     // puedes poner aquí el ID del usuario de tu app
        first_name: 'Guest',
        last_name: 'User',
      },
      resources: [
        {
          type: 'dashboard',
          id: embeddedDashboardId, // EMBEDDED_DASHBOARD_ID de Preset
        },
      ],
      rls: [], // aquí puedes meter Row Level Security si quieres
    };

    const guestTokenResponse = await fetch(
      `${managerUrl}/v1/teams/${teamId}/workspaces/${workspaceId}/guest-token/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const rawText = await guestTokenResponse.text();

    if (!guestTokenResponse.ok) {
      console.error('Guest token request failed:', guestTokenResponse.status, rawText);
      return NextResponse.json(
        {
          error: 'Failed to generate guest token',
          details: rawText,
        },
        { status: guestTokenResponse.status },
      );
    }

    let json: any = {};
    try {
      json = JSON.parse(rawText);
    } catch (e) {
      console.error('Error parsing guest token JSON:', e, rawText);
      return NextResponse.json(
        { error: 'Invalid JSON from Preset guest-token endpoint' },
        { status: 500 },
      );
    }

    const guestToken =
      json?.data?.payload?.token ||
      json?.payload?.token ||
      json?.token;

    if (!guestToken) {
      console.error('No token in guest-token response:', json);
      return NextResponse.json(
        { error: 'No guest token found in response' },
        { status: 500 },
      );
    }

    console.log('✓ Guest token generated');

    return NextResponse.json({ token: guestToken });
  } catch (error) {
    console.error('Unexpected error generating guest token:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
