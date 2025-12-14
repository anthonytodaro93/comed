// app/api/comed/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://hourlypricing.comed.com/api?type=5minutefeed');
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from ComEd' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}
