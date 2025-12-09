# Cloudflare Worker Setup Guide

## Why Use Cloudflare Workers?

Azure Blob Storage doesn't support HTTPS with custom domains without Azure CDN (~$10/month). Cloudflare Workers provide a **FREE** solution to proxy your custom domain to Azure with HTTPS.

## Benefits
- ✅ **Free** (100k requests/day)
- ✅ Custom domain with HTTPS
- ✅ Global CDN
- ✅ No Azure CDN costs
- ✅ Easy to set up

---

## Step-by-Step Setup

### 1. Create the Worker

1. **Login to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com

2. **Navigate to Workers & Pages**
   - Click on "Workers & Pages" in the left sidebar

3. **Create a New Worker**
   - Click "Create Application"
   - Select "Create Worker"
   - Name it: `azure-resume-proxy`
   - Click "Deploy"

### 2. Add the Worker Code

1. **Click "Edit Code"** on your newly created worker

2. **Replace the default code** with the contents of `cloudflare-worker.js`

3. **Click "Save and Deploy"**

### 3. Add Custom Domain Route

1. **Go to "Triggers" tab** in your worker

2. **Click "Add Route"**

3. **Configure the route:**
   - **Route:** `alexandercloudconsultant.com/*`
   - **Zone:** Select `alexandercloudconsultant.com`
   - **Worker:** Select `azure-resume-proxy`

4. **Add another route for www:**
   - **Route:** `www.alexandercloudconsultant.com/*`
   - **Zone:** Select `alexandercloudconsultant.com`
   - **Worker:** Select `azure-resume-proxy`

5. **Click "Save"**

### 4. Update DNS (if needed)

Your existing CNAME records should work, but verify:

1. **Go to DNS** → **Records**

2. **Ensure you have:**
   - Type: `CNAME`
   - Name: `@`
   - Target: `stresume9n30ne.z13.web.core.windows.net`
   - Proxy: **Proxied (Orange Cloud)**

   - Type: `CNAME`
   - Name: `www`
   - Target: `stresume9n30ne.z13.web.core.windows.net`
   - Proxy: **Proxied (Orange Cloud)**

### 5. Test Your Site

Wait 1-2 minutes for propagation, then visit:
- https://alexandercloudconsultant.com
- https://www.alexandercloudconsultant.com

Both should now work with HTTPS! 🎉

---

## Troubleshooting

### Site Not Loading
- Wait 5 minutes for DNS/Worker propagation
- Clear browser cache (Cmd+Shift+R)
- Try incognito mode
- Check worker logs in Cloudflare dashboard

### 502 Error
- Verify Azure endpoint is correct in worker code
- Check that Azure Blob Storage has files deployed
- Review worker logs for errors

### SSL Certificate Issues
- Ensure Cloudflare proxy is enabled (orange cloud)
- Check SSL/TLS settings in Cloudflare (should be "Full")

---

## Worker Code Explanation

```javascript
// The worker intercepts requests to your domain
export default {
  async fetch(request) {
    // Parse the URL
    const url = new URL(request.url);
    
    // Replace domain with Azure endpoint
    url.hostname = 'stresume9n30ne.z13.web.core.windows.net';
    
    // Fetch from Azure and return response
    return fetch(url, {
      headers: request.headers,
      method: request.method,
      body: request.body,
    });
  }
}
```

**What it does:**
1. Receives request to `alexandercloudconsultant.com`
2. Rewrites URL to point to Azure Blob Storage
3. Fetches content from Azure
4. Returns it to the user
5. Cloudflare handles SSL/HTTPS automatically

---

## Cost Analysis

| Service | Cost | Notes |
|---------|------|-------|
| Cloudflare Worker | **$0** | Free tier: 100k requests/day |
| Cloudflare CDN | **$0** | Included |
| Cloudflare SSL | **$0** | Included |
| Azure Blob Storage | **~$0.50** | Storage + bandwidth |
| **Total** | **~$0.50/month** | 🎉 |

Compare to Azure CDN: ~$10-15/month

---

## Monitoring

### View Worker Analytics
1. Go to Workers & Pages
2. Click on your worker
3. View "Metrics" tab for:
   - Request count
   - Success rate
   - Errors
   - Response time

### Set Up Alerts (Optional)
1. Go to "Notifications" in Cloudflare
2. Create alert for worker errors
3. Get notified if issues occur

---

## Updating the Worker

If you need to change the Azure endpoint:

1. Edit `cloudflare-worker.js` locally
2. Go to Cloudflare Dashboard → Workers
3. Click your worker → "Edit Code"
4. Paste updated code
5. Click "Save and Deploy"

---

## Alternative: Wrangler CLI (Advanced)

For automated deployments:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy worker
wrangler deploy cloudflare-worker.js
```

---

## Security Features

The worker includes:
- ✅ CORS headers
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ HTTPS enforcement via Cloudflare

---

## Next Steps

After setup:
1. ✅ Test both HTTP and HTTPS (should redirect to HTTPS)
2. ✅ Test www and non-www versions
3. ✅ Check mobile responsiveness
4. ✅ Verify visitor counter works (when API is ready)
5. ✅ Monitor worker analytics

---

## Support

If you encounter issues:
- Check Cloudflare Worker logs
- Review Azure Blob Storage access
- Verify DNS propagation: https://www.whatsmydns.net
- Test Azure endpoint directly: https://stresume9n30ne.z13.web.core.windows.net

---

**Last Updated:** December 2025  
**Status:** Production Ready ✅
