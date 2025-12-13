const { CosmosClient } = require('@azure/cosmos');

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

    try {
        let count = 0;
        
        // Try CosmosDB first
        if (process.env.CosmosDBConnection) {
            context.log('Using CosmosDB storage');
            
            const client = new CosmosClient(process.env.CosmosDBConnection);
            const database = client.database('ResumeDB');
            const container = database.container('Counters');
            
            try {
                // Get current count
                const { resource } = await container.item('visitor-count', 'visitor-count').read();
                count = resource.count + 1;
                
                // Update count
                await container.item('visitor-count', 'visitor-count').replace({
                    id: 'visitor-count',
                    count: count
                });
                
                context.log(`Updated CosmosDB count: ${count}`);
            } catch (readError) {
                // Document doesn't exist, create it
                count = 1;
                await container.items.create({
                    id: 'visitor-count',
                    count: count
                });
                
                context.log(`Created new CosmosDB document with count: ${count}`);
            }
        } else {
            // Fallback to in-memory
            context.log('No CosmosDB connection, using in-memory counter');
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
        context.log('CosmosDB error, falling back to in-memory:', error.message);
        
        // Fallback to in-memory on any error
        visitorCount++;
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: { count: visitorCount }
        };
    }
};