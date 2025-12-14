// api/comed/index.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://hourlypricing.comed.com/api?type=5minutefeed');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from ComEd' });
    }

    const data = await response.json();

    // Allow your app to access it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 'no-cache');

    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
