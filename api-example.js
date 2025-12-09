// Example Azure Function with CosmosDB binding for visitor counter
// Create this locally using VS Code Azure Functions extension
// Reference: https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code

module.exports = async function (context, req, counterIn, counterOut) {
    // counterIn: Input binding from CosmosDB
    // counterOut: Output binding to CosmosDB
    
    const currentCount = counterIn ? counterIn.count : 0;
    const newCount = currentCount + 1;
    
    // Update counter in CosmosDB via output binding
    context.bindings.counterOut = {
        id: 'visitor-count',
        count: newCount
    };
    
    context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { count: newCount }
    };
};

// function.json configuration:
// {
//   "bindings": [
//     {
//       "authLevel": "anonymous",
//       "type": "httpTrigger",
//       "direction": "in",
//       "name": "req",
//       "methods": ["post"]
//     },
//     {
//       "type": "http",
//       "direction": "out",
//       "name": "res"
//     },
//     {
//       "type": "cosmosDB",
//       "direction": "in",
//       "name": "counterIn",
//       "databaseName": "ResumeDB",
//       "collectionName": "Counters",
//       "connectionStringSetting": "CosmosDBConnection",
//       "id": "visitor-count",
//       "partitionKey": "visitor-count"
//     },
//     {
//       "type": "cosmosDB",
//       "direction": "out",
//       "name": "counterOut",
//       "databaseName": "ResumeDB",
//       "collectionName": "Counters",
//       "connectionStringSetting": "CosmosDBConnection",
//       "createIfNotExists": true
//     }
//   ]
// }
