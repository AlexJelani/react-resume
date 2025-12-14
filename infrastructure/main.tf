terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resume" {
  name     = "rg-resume"
  location = "East US"
  
  tags = {
    Environment = "Production"
    Project     = "Resume"
    ManagedBy   = "Terraform"
    CostCenter  = "Personal"
  }
}

resource "azurerm_storage_account" "resume" {
  name                     = "stresume${random_string.suffix.result}"
  resource_group_name      = azurerm_resource_group.resume.name
  location                 = azurerm_resource_group.resume.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }
  
  tags = {
    Environment = "Production"
    Project     = "Resume"
    ManagedBy   = "Terraform"
    CostCenter  = "Personal"
  }
}

resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

output "storage_account_name" {
  value = azurerm_storage_account.resume.name
}

output "primary_web_endpoint" {
  value = azurerm_storage_account.resume.primary_web_endpoint
}

output "storage_account_key" {
  value     = azurerm_storage_account.resume.primary_access_key
  sensitive = true
}

output "static_web_app_name" {
  value = azurerm_static_site.resume.name
}

output "static_web_app_url" {
  value = "https://${azurerm_static_site.resume.default_host_name}"
}

output "static_web_app_api_key" {
  value     = azurerm_static_site.resume.api_key
  sensitive = true
}

output "cosmosdb_endpoint" {
  value = azurerm_cosmosdb_account.resume.endpoint
}

output "cosmosdb_primary_key" {
  value     = azurerm_cosmosdb_account.resume.primary_key
  sensitive = true
}



# Static Web App (includes API functions)
resource "azurerm_static_site" "resume" {
  name                = "swa-resume-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.resume.name
  location            = "East US 2"
  sku_tier            = "Free"
  sku_size            = "Free"

  tags = {
    Environment = "Production"
    Project     = "Resume"
    ManagedBy   = "Terraform"
    CostCenter  = "Personal"
  }
}

# CosmosDB Account (Serverless)
resource "azurerm_cosmosdb_account" "resume" {
  name                = "cosmos-resume-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.resume.name
  location            = azurerm_resource_group.resume.location
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  capabilities {
    name = "EnableServerless"
  }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.resume.location
    failover_priority = 0
  }

  tags = {
    Environment = "Production"
    Project     = "Resume"
    ManagedBy   = "Terraform"
    CostCenter  = "Personal"
  }
}

# CosmosDB Database
resource "azurerm_cosmosdb_sql_database" "resume" {
  name                = "ResumeDB"
  resource_group_name = azurerm_resource_group.resume.name
  account_name        = azurerm_cosmosdb_account.resume.name
}

# CosmosDB Container - Weather Analytics
resource "azurerm_cosmosdb_sql_container" "weather_analytics" {
  name                = "WeatherAnalytics"
  resource_group_name = azurerm_resource_group.resume.name
  account_name        = azurerm_cosmosdb_account.resume.name
  database_name       = azurerm_cosmosdb_sql_database.resume.name
  partition_key_path  = "/type"
}

# Budget Alert
resource "azurerm_consumption_budget_resource_group" "resume_budget" {
  name              = "budget-resume"
  resource_group_id = azurerm_resource_group.resume.id

  amount     = 5
  time_grain = "Monthly"

  time_period {
    start_date = "2025-12-01T00:00:00Z"
  }

  notification {
    enabled   = true
    threshold = 80
    operator  = "GreaterThan"

    contact_emails = [
      "jelani@alexandercloudcounsultant.com"
    ]
  }

  notification {
    enabled   = true
    threshold = 100
    operator  = "GreaterThan"

    contact_emails = [
      "jelani@alexandercloudcounsultant.com"
    ]
  }
}
