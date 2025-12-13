# Cloud Resume Challenge - Azure Edition

![App preview](https://pbs.twimg.com/media/FGfEkxsXIAEMtZI?format=jpg&name=4096x4096)

**Live Sites:** 
- **Production:** [https://alexandercloudconsultant.com](https://alexandercloudconsultant.com) (Azure Blob Storage + Cloudflare)
- **Azure Static Web Apps:** [https://lemon-smoke-0541d8f0f.3.azurestaticapps.net](https://lemon-smoke-0541d8f0f.3.azurestaticapps.net) (Full-stack with API)

A full-stack serverless resume website deployed on Microsoft Azure with CI/CD automation, Infrastructure as Code, custom domain with HTTPS, and Azure Functions API backend.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is a port of [Resume](https://github.com/StartBootstrap/startbootstrap-resume) by [Start Bootstrap](https://startbootstrap.com).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build
```

## 🏗️ Architecture

### Production Setup (Main Branch)
- **Frontend:** React + TypeScript + Bootstrap
- **Hosting:** Azure Blob Storage (Static Website)
- **CDN/SSL:** Cloudflare Worker (Free proxy to Azure)
- **Domain:** alexandercloudconsultant.com

### Full-Stack Setup (Feature Branch)
- **Frontend:** React + TypeScript + Bootstrap
- **Hosting:** Azure Static Web Apps
- **Backend:** Azure Functions (Node.js)
- **API:** Visitor Counter with in-memory storage
- **Domain:** lemon-smoke-0541d8f0f.3.azurestaticapps.net

### Infrastructure
- **IaC:** Terraform
- **CI/CD:** GitHub Actions (2 pipelines)
- **Monitoring:** Azure Budget Alerts + Resource Tags

## 💰 Cost

### Production Setup
**~$0.50-1/month** (Azure Blob Storage only)
- Cloudflare Worker: FREE (100k requests/day)
- No Azure CDN needed!

### Full-Stack Setup
**~$0.75-1.25/month** (Includes CosmosDB!)
- Azure Static Web Apps: FREE (100GB bandwidth)
- Azure Functions: FREE (1M executions/month)
- CosmosDB Serverless: ~$0.25-0.75/month (pay per request)

## 🚀 Features

### 📊 Visitor Counter
- **Real-time visitor tracking** displayed in navigation and footer
- **Azure Functions backend** with CosmosDB persistent storage
- **Increments by 1** on each page visit
- **Persistent across restarts** - no more number skipping
- **Automatic database/container creation** on first function execution

### 🔄 Dual Deployment Strategy
- **Main branch:** Deploys to production (Blob Storage + Cloudflare)
- **Feature branch:** Deploys to Azure Static Web Apps with API
- **Independent pipelines** for testing and production

## 📚 Documentation

- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Detailed project documentation
- [CLOUDFLARE_WORKER_SETUP.md](CLOUDFLARE_WORKER_SETUP.md) - Custom domain setup guide
- [infrastructure/README.md](infrastructure/README.md) - Terraform setup

## ⚠️ Common Gotchas & Solutions

### 1. Custom Domain with HTTPS
**Problem:** Azure Blob Storage doesn't support HTTPS with custom domains without Azure CDN (~$10/month).

**Solution:** Use Cloudflare Workers (FREE) to proxy requests from your custom domain to Azure.
- See [CLOUDFLARE_WORKER_SETUP.md](CLOUDFLARE_WORKER_SETUP.md) for setup
- Cost: $0 (stays within free tier)

### 2. Git History with Secrets
**Problem:** Accidentally committed Terraform state files or Azure storage keys to git.

**Solution:**
```bash
# Add to .gitignore
**/.terraform/*
*.tfstate*

# Clean git history
git filter-branch --force --index-filter \
  'git rm -rf --cached --ignore-unmatch infrastructure/.terraform' \
  --prune-empty --tag-name-filter cat -- --all

# Rotate exposed keys
az storage account keys renew \
  --account-name <storage-account> \
  --key primary
```

### 3. Large Terraform Provider Files
**Problem:** Terraform provider binaries (260MB+) exceed GitHub's 100MB file limit.

**Solution:** Always add to `.gitignore` BEFORE running `terraform init`:
```
**/.terraform/*
*.tfstate*
.terraform.lock.hcl
```

### 4. CI/CD Build Warnings as Errors
**Problem:** GitHub Actions treats warnings as errors in CI mode, causing build failures.

**Solution:** Disable CI mode in build step:
```yaml
- name: Build React app
  run: CI=false npm run build
```

### 5. DNS Propagation Issues
**Problem:** Custom domain not resolving after Cloudflare setup.

**Solution:**
- Verify nameservers are set to Cloudflare (not Namecheap)
- Wait 15 minutes to 2 hours for DNS propagation
- Clear browser cache (Cmd+Shift+R)
- Check propagation: https://www.whatsmydns.net

### 6. Azure Storage "Invalid URI" Error
**Problem:** Getting 400 error when accessing custom domain.

**Solution:** Use Cloudflare Worker to proxy requests (Azure doesn't support custom domains with HTTPS directly).

### 7. Budget Alert Not Working
**Problem:** Terraform budget resource fails or doesn't send emails.

**Solution:**
- Verify email address in `main.tf`
- Check Azure Portal → Cost Management → Budgets
- Ensure subscription has proper permissions
- Budget alerts may take 24 hours to activate

### 8. GitHub Actions Secrets Not Working
**Problem:** Deployment fails with authentication errors.

**Solution:**
```bash
# Get correct values
cd infrastructure
terraform output storage_account_name
terraform output -raw storage_account_key

# Update GitHub Secrets:
# Settings → Secrets → Actions
# - AZURE_STORAGE_ACCOUNT
# - AZURE_STORAGE_KEY
```

### 9. Visitor Counter Not Displaying
**Problem:** Counter shows "Loading..." or error.

**Solution:**
- For local testing: Run `func start` in `/api` directory
- For production: Ensure Azure Functions API is deployed with CosmosDB dependency
- Check API URL in Navigation component
- Verify CORS settings and CosmosDB permissions
- Check Azure Portal → CosmosDB → Data Explorer → ResumeDB → Counters for visitor document

### 10. Terraform State Conflicts
**Problem:** "Resource already exists" error when running `terraform apply`.

**Solution:**
```bash
# Import existing resources
terraform import azurerm_resource_group.resume /subscriptions/<sub-id>/resourceGroups/rg-resume
terraform import azurerm_storage_account.resume /subscriptions/<sub-id>/resourceGroups/rg-resume/providers/Microsoft.Storage/storageAccounts/<storage-name>
```

### 11. Azure Static Web Apps Build Failures
**Problem:** Build fails with "Treating warnings as errors because process.env.CI = true".

**Solution:** Add custom build command in workflow:
```yaml
app_build_command: "CI=false npm run build"
```

### 12. Visitor Counter Not Incrementing
**Problem:** Counter shows random numbers or doesn't increment properly.

**Solution:** Use CosmosDB for persistent storage:
```javascript
const { CosmosClient } = require('@azure/cosmos');
// Persistent counter with CosmosDB Serverless
// Automatically creates ResumeDB database and Counters container
// No more number skipping or resets
```
Note: Counter persists across function restarts using CosmosDB.

### 13. CosmosDB Dependency Missing
**Problem:** Function fails with "Cannot find module '@azure/cosmos'".

**Solution:** Ensure package.json includes the dependency:
```json
{
  "dependencies": {
    "@azure/functions": "^4.0.0",
    "@azure/cosmos": "^4.0.0"
  }
}
```
Redeploy after adding the dependency to package.json.

## 🔒 Security Best Practices

1. ✅ Never commit secrets to git
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate keys immediately if exposed
4. ✅ Add `.terraform/` to `.gitignore`
5. ✅ Use Cloudflare proxy for DDoS protection
6. ✅ Enable budget alerts to prevent surprise bills

## 📝 Deployment Checklist

### Production Deployment (Main Branch)
- [ ] Run `terraform init` and `terraform apply`
- [ ] Get storage account name and key from Terraform outputs
- [ ] Add secrets to GitHub (AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_KEY)
- [ ] Push code to main branch to trigger deployment
- [ ] Create Cloudflare Worker with provided script
- [ ] Add worker routes for your domain
- [ ] Verify nameservers point to Cloudflare
- [ ] Test site at https://yourdomain.com

### Azure Static Web Apps Deployment (Feature Branch)
- [ ] Infrastructure already deployed via Terraform
- [ ] Add GitHub secret: AZURE_STATIC_WEB_APPS_API_TOKEN
- [ ] Push code to feature/azure-functions-backend branch
- [ ] Monitor deployment in GitHub Actions
- [ ] Test full-stack site with visitor counter
- [ ] Verify API endpoint: /api/visitor

## 🎯 Next Steps

- [x] **Complete visitor counter API** (Azure Functions - DONE!)
- [x] **Add persistent storage** (CosmosDB Serverless - DONE!)
- [ ] Add contact form with email notifications
- [ ] Implement analytics dashboard
- [ ] Merge feature branch to main for unified deployment
- [ ] Add automated tests to CI/CD
- [ ] Add monitoring and alerting for API functions

## 📧 Contact

- **Website:** [alexandercloudconsultant.com](https://alexandercloudconsultant.com)
- **GitHub:** [@AlexJelani](https://github.com/AlexJelani)

## 📄 License

Licensed under MIT. Totally free for private or commercial projects.
 
