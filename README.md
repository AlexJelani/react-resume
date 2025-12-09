# Cloud Resume Challenge - Azure Edition

![App preview](https://pbs.twimg.com/media/FGfEkxsXIAEMtZI?format=jpg&name=4096x4096)

**Live Site:** [https://alexandercloudconsultant.com](https://alexandercloudconsultant.com)

A full-stack serverless resume website deployed on Microsoft Azure with CI/CD automation, Infrastructure as Code, and custom domain with HTTPS.

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

- **Frontend:** React + TypeScript + Bootstrap
- **Hosting:** Azure Blob Storage (Static Website)
- **CDN/SSL:** Cloudflare Worker (Free proxy to Azure)
- **IaC:** Terraform
- **CI/CD:** GitHub Actions
- **Monitoring:** Azure Budget Alerts + Resource Tags

## 💰 Cost

**~$0.50-1/month** (Azure Blob Storage only)
- Cloudflare Worker: FREE (100k requests/day)
- No Azure CDN needed!

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
- For local testing: Run `node mock-api.js` first
- For production: Ensure Azure Functions API is deployed
- Check API URL in `src/components/IndexPage.tsx`
- Verify CORS settings on Azure Functions

### 10. Terraform State Conflicts
**Problem:** "Resource already exists" error when running `terraform apply`.

**Solution:**
```bash
# Import existing resources
terraform import azurerm_resource_group.resume /subscriptions/<sub-id>/resourceGroups/rg-resume
terraform import azurerm_storage_account.resume /subscriptions/<sub-id>/resourceGroups/rg-resume/providers/Microsoft.Storage/storageAccounts/<storage-name>
```

## 🔒 Security Best Practices

1. ✅ Never commit secrets to git
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate keys immediately if exposed
4. ✅ Add `.terraform/` to `.gitignore`
5. ✅ Use Cloudflare proxy for DDoS protection
6. ✅ Enable budget alerts to prevent surprise bills

## 📝 Deployment Checklist

- [ ] Run `terraform init` and `terraform apply`
- [ ] Get storage account name and key from Terraform outputs
- [ ] Add secrets to GitHub (AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_KEY)
- [ ] Push code to trigger GitHub Actions deployment
- [ ] Create Cloudflare Worker with provided script
- [ ] Add worker routes for your domain
- [ ] Verify nameservers point to Cloudflare
- [ ] Test site at https://yourdomain.com
- [ ] Monitor worker analytics in Cloudflare

## 🎯 Next Steps

- [ ] Complete visitor counter API (Azure Functions + CosmosDB)
- [ ] Add contact form with email notifications
- [ ] Implement analytics dashboard
- [ ] Create staging environment
- [ ] Add automated tests to CI/CD

## 📧 Contact

- **Website:** [alexandercloudconsultant.com](https://alexandercloudconsultant.com)
- **GitHub:** [@AlexJelani](https://github.com/AlexJelani)

## 📄 License

Licensed under MIT. Totally free for private or commercial projects.
