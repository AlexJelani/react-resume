module.exports = async function (context, req) {
    try {
        // Simple test response without CosmosDB for now
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                message: 'Analytics endpoint working',
                count: 0,
                recent: [],
                cities: [],
                note: 'CosmosDB integration temporarily disabled due to crypto module issue'
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};