const { TableClient } = require('@azure/data-tables');

// Fallback to in-memory if no storage configured
let visitorCount = 0;

module.exports = async function (context, req) {
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    try {
        let count;
        
        // Try Azure Table Storage first
        if (process.env.AzureWebJobsStorage) {
            const tableClient = TableClient.fromConnectionString(
                process.env.AzureWebJobsStorage, 
                'VisitorCount'
            );
            
            try {
                await tableClient.createTable();
                const entity = await tableClient.getEntity('counter', 'visitors');
                count = entity.count + 1;
                await tableClient.updateEntity({
                    partitionKey: 'counter',
                    rowKey: 'visitors', 
                    count
                });
            } catch {
                // Create initial entity
                count = 1;
                await tableClient.createEntity({
                    partitionKey: 'counter',
                    rowKey: 'visitors',
                    count
                });
            }
        } else {
            // Fallback to in-memory
            visitorCount++;
            count = visitorCount;
        }
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: { count }
        };
    } catch (error) {
        context.log('Error:', error);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: { error: 'Failed to get visitor count' }
        };
    }
};}