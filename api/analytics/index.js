const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    try {
        if (!process.env.CosmosDBConnection) {
            context.res = { status: 500, body: 'CosmosDB not configured' };
            return;
        }

        const client = new CosmosClient(process.env.CosmosDBConnection);
        const database = client.database('ResumeDB');
        const container = database.container('WeatherAnalytics');
        
        const { resources } = await container.items
            .query({
                query: "SELECT * FROM c WHERE c.type = 'weather_request' ORDER BY c.timestamp DESC",
                parameters: []
            })
            .fetchAll();

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                count: resources.length,
                recent: resources.slice(0, 10),
                cities: [...new Set(resources.map(r => r.city))]
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};