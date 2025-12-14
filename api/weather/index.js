const { CosmosClient } = require('@azure/cosmos');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async function (context, req) {
    // Handle CORS preflight
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
        const weatherApiKey = process.env.WEATHERAPI_KEY;
        
        // Only accept POST requests with coordinates
        if (req.method !== 'POST' || !req.body || !req.body.lat || !req.body.lon) {
            throw new Error('Geolocation coordinates required');
        }
        
        // Use coordinates from browser geolocation
        const weatherQuery = `${req.body.lat},${req.body.lon}`;
        context.log(`Using geolocation: ${weatherQuery}`);
        
        // Get weather data from WeatherAPI.com
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherQuery}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error(`API failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract weather data
        const weather = {
            city: data.location.name,
            country: data.location.country,
            temperature: Math.round(data.current.temp_f),
            icon: getWeatherIcon(data.current.condition.text),
            condition: data.current.condition.text
        };

        // Store analytics in CosmosDB if configured
        if (process.env.CosmosDBConnection) {
            try {
                await storeWeatherAnalytics(context, {
                    lat: req.body.lat,
                    lon: req.body.lon,
                    city: weather.city,
                    temperature: weather.temperature,
                    condition: weather.condition,
                    timestamp: new Date().toISOString()
                });
            } catch (dbError) {
                context.log('CosmosDB error (non-fatal):', dbError.message);
            }
        }

        // Return response with condition field
        const uiResponse = {
            city: weather.city,
            country: weather.country,
            temperature: weather.temperature,
            condition: weather.condition,
            icon: weather.icon
        };

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: uiResponse
        };

    } catch (error) {
        context.log('Error getting weather:', error.message);
        
        // Simple fallback that matches your UI structure
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                city: 'Nagoya',
                temperature: 72,
                icon: '⛅'
            }
        };
    }
};

// Convert WeatherAPI condition to emoji
function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
        return '☀️';
    } else if (conditionLower.includes('partly cloudy')) {
        return '⛅';
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
        return '☁️';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        return '🌧️';
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
        return '❄️';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
        return '⛈️';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
        return '🌫️';
    }
    
    return '🌤️'; // Default
}

// Store weather request analytics in CosmosDB
async function storeWeatherAnalytics(context, weatherData) {
    const client = new CosmosClient(process.env.CosmosDBConnection);
    const database = client.database('ResumeDB');
    const container = database.container('WeatherAnalytics');
    
    const analyticsDoc = {
        id: `weather-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'weather_request',
        lat: weatherData.lat,
        lon: weatherData.lon,
        city: weatherData.city,
        temperature: weatherData.temperature,
        condition: weatherData.condition,
        timestamp: weatherData.timestamp,
        source: 'geolocation'
    };
    
    await container.items.create(analyticsDoc);
    context.log('✅ Weather analytics saved to CosmosDB');
}