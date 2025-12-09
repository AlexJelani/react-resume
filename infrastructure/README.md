# Infrastructure Setup

## Prerequisites
- Azure CLI installed and logged in
- Terraform installed

## Deploy Infrastructure

1. **Initialize Terraform:**
   ```bash
   cd infrastructure
   terraform init
   ```

2. **Create infrastructure:**
   ```bash
   terraform apply
   ```

3. **Get outputs for GitHub secrets:**
   ```bash
   terraform output storage_account_name
   terraform output -raw storage_account_key
   ```

## Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `AZURE_STORAGE_ACCOUNT` - From terraform output
- `AZURE_STORAGE_KEY` - From terraform output

## Deploy

Push to main branch and GitHub Actions will automatically build and deploy.
