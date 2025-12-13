const { TableClient } = require('@azure/data-tables');

let visitorCount = 0; // Fallback counter

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

    let count = 0;
    
    try {
        // Try Azure Tables first
        if (process.env.AzureWebJobsStorage) {
            context.log('Using Azure Tables storage');
            
            const tableClient = TableClient.fromConnectionString(
                process.env.AzureWebJobsStorage,
                'VisitorCount'
            );
            
            // Ensure table exists
            await tableClient.createTable();
            
            try {
                // Get current count
                const entity = await tableClient.getEntity('counter', 'visitors');
                count = entity.count + 1;
                
                // Update count
                await tableClient.updateEntity({
                    partitionKey: 'counter',
                    rowKey: 'visitors',
                    count: count
                });
                
                context.log(`Updated Azure Tables count: ${count}`);
            } catch (getError) {
                // Entity doesn't exist, create it
                count = 1;
                await tableClient.createEntity({
                    partitionKey: 'counter',
                    rowKey: 'visitors',
                    count: count
                });
                
                context.log(`Created new Azure Tables entity with count: ${count}`);
            }
        } else {
            // Fallback to in-memory
            context.log('No storage connection, using in-memory counter');
            visitorCount++;
            count = visitorCount;
        }
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: { count: count }
        };
        
    } catch (error) {
        context.log('Azure Tables error, falling back to in-memory:', error.message);
        
        // Fallback to in-memory on any error
        visitorCount++;
        count = visitorCount;
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: { count: count }
        };
    }
};