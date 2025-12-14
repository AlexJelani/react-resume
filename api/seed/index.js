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
        
        // Dummy weather data
        const dummyData = [
            {
                id: `weather-${Date.now()}-1`,
                type: 'weather_request',
                lat: 37.3382,
                lon: -121.8863,
                city: 'San Jose',
                temperature: 58,
                condition: 'Clear',
                timestamp: new Date().toISOString(),
                source: 'geolocation'
            },
            {
                id: `weather-${Date.now()}-2`,
                type: 'weather_request',
                lat: 35.6762,
                lon: 139.6503,
                city: 'Tokyo',
                temperature: 45,
                condition: 'Cloudy',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                source: 'geolocation'
            },
            {
                id: `weather-${Date.now()}-3`,
                type: 'weather_request',
                lat: 40.7128,
                lon: -74.0060,
                city: 'New York',
                temperature: 32,
                condition: 'Snow',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                source: 'geolocation'
            }
        ];

        // Insert dummy data
        for (const item of dummyData) {
            await container.items.create(item);
        }

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                message: 'Dummy data added successfully',
                count: dummyData.length,
                data: dummyData
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};