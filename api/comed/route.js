// app/api/comed/route.js

export async function GET() {
  try {
    const response = await fetch('https://hourlypricing.comed.com/api?type=5minutefeed');
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from ComEd' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
