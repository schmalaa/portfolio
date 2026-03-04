export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'schmalaa';

    try {
        const rssUrl = `https://medium.com/feed/@${username}?t=${Date.now()}`;
        const response = await fetch(rssUrl, {
            headers: {
                // Some RSS endpoints block default node-fetch agents
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml',
            },
            // Force Next.js to dynamically fetch this on every request instead of caching
            cache: 'no-store'
        });

        if (!response.ok) {
            return new Response(`Failed to fetch Medium feed: ${response.status} ${response.statusText}`, { status: response.status });
        }

        const xmlString = await response.text();

        // Return raw XML and let the client-side DOMParser handle the heavy lifting
        return new Response(xmlString, {
            headers: {
                'Content-Type': 'application/xml',
                // Explicitly tell the browser allowing cross-origin requests
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store, max-age=0'
            }
        });

    } catch (error) {
        console.error("API Route Error fetching Medium RSS:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
