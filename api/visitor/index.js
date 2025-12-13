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
            
            // Atomic increment with retry logic
            let retries = 3;
            while (retries > 0) {
                try {
                    const { resource } = await container.item('visitor-count', 'visitor-count').read();
                    const newCount = resource.count + 1;
                    
                    // Atomic update with etag check
                    await container.item('visitor-count', 'visitor-count').replace({
                        id: 'visitor-count',
                        count: newCount
                    }, { accessCondition: { type: 'IfMatch', condition: resource._etag } });
                    
                    count = newCount;
                    context.log(`Updated CosmosDB count: ${count}`);
                    break;
                } catch (error) {
                    if (error.code === 412 && retries > 1) {
                        // Conflict - retry
                        retries--;
                        context.log(`Conflict detected, retrying... (${retries} left)`);
                        continue;
                    } else if (error.code === 404) {
                        // Document doesn't exist, create it
                        try {
                            await container.items.create({
                                id: 'visitor-count',
                                count: 1
                            });
                            count = 1;
                            context.log('Created new CosmosDB document with count: 1');
                            break;
                        } catch (createError) {
                            if (createError.code === 409) {
                                // Document was created by another request, retry
                                retries--;
                                continue;
                            }
                            throw createError;
                        }
                    } else {
                        throw error;
                    }
                }
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