module.exports = async function (context, req, weatherData) {
    try {
        // weatherData comes from CosmosDB input binding
        const data = weatherData || [];
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                count: data.length,
                recent: data.slice(0, 10),
                cities: [...new Set(data.map(r => r.city))]
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};