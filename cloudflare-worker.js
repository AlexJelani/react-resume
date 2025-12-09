/**
 * Cloudflare Worker - Azure Blob Storage Proxy
 * 
 * This worker proxies requests from your custom domain to Azure Blob Storage,
 * enabling HTTPS with custom domain without Azure CDN costs.
 * 
 * Setup Instructions:
 * 1. Go to Cloudflare Dashboard → Workers & Pages
 * 2. Click "Create Application" → "Create Worker"
 * 3. Name it: "azure-resume-proxy"
 * 4. Replace the default code with this script
 * 5. Click "Deploy"
 * 6. Go to "Triggers" → "Add Route"
 * 7. Add route: alexandercloudconsultant.com/*
 * 8. Select your worker
 * 9. Save
 * 
 * Cost: FREE (100,000 requests/day on free tier)
 */

export default {
  async fetch(request, env, ctx) {
    // Azure Blob Storage static website endpoint
    const AZURE_ENDPOINT = 'stresume9n30ne.z13.web.core.windows.net';
    
    // Parse the incoming request URL
    const url = new URL(request.url);
    
    // Replace the hostname with Azure endpoint
    url.hostname = AZURE_ENDPOINT;
    
    // Create new request to Azure
    const azureRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    });
    
    try {
      // Fetch from Azure Blob Storage
      const response = await fetch(azureRequest);
      
      // Clone the response so we can modify headers
      const newResponse = new Response(response.body, response);
      
      // Add CORS headers if needed
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      
      // Add security headers
      newResponse.headers.set('X-Content-Type-Options', 'nosniff');
      newResponse.headers.set('X-Frame-Options', 'DENY');
      newResponse.headers.set('X-XSS-Protection', '1; mode=block');
      
      return newResponse;
      
    } catch (error) {
      // Return error response
      return new Response('Error fetching from Azure: ' + error.message, {
        status: 502,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  },
};
