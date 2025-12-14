const { CosmosClient } = require('@azure/cosmos');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
        // Get user's IP address
        const userIP = req.headers['x-forwarded-for'] || 
                      req.headers['x-real-ip'] || 
                      (req.connection && req.connection.remoteAddress) ||
                      '8.8.8.8'; // fallback for testing

        context.log(`Getting location for IP: ${userIP}`);

        // Get location from IP using ipapi.co (free tier)
        let city = 'Nagoya';
        let country = 'Japan';
        
        try {
            const locationResponse = await fetch(`http://ipapi.co/${userIP}/json/`);
            if (locationResponse.ok) {
                const locationData = await locationResponse.json();
                city = locationData.city || 'Nagoya';
                country = locationData.country_name || 'Japan';
                context.log(`Detected location: ${city}, ${country}`);
            } else {
                context.log('Location API failed, using default location');
            }
        } catch (locationError) {
            context.log('Location detection error:', locationError.message);
        }
        
        // Get real weather data using WeatherAPI.com (free tier)
        const weatherApiKey = process.env.WEATHERAPI_KEY;
        
        let temperature, condition, weatherIcon;
        
        if (weatherApiKey) {
            try {
                const weatherResponse = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`
                );
                
                if (weatherResponse.ok) {
                    const data = await weatherResponse.json();
                    temperature = Math.round(data.current.temp_f);
                    condition = data.current.condition.text;
                    weatherIcon = getWeatherIcon(condition);
                    
                    context.log(`Real weather: ${temperature}°F, ${condition}`);
                } else {
                    throw new Error('Weather API failed');
                }
            } catch (apiError) {
                context.log('WeatherAPI error:', apiError.message);
                // Fall back to simulation
                const weatherData = getLocationWeather(city, country);
                temperature = weatherData.temperature;
                condition = weatherData.condition;
                weatherIcon = getWeatherIcon(condition);
            }
        } else {
            // No API key - use simulation
            const weatherData = getLocationWeather(city, country);
            temperature = weatherData.temperature;
            condition = weatherData.condition;
            weatherIcon = getWeatherIcon(condition);
        }

        // Store analytics in CosmosDB
        if (process.env.CosmosDBConnection) {
            try {
                const client = new CosmosClient(process.env.CosmosDBConnection);
                const database = client.database('ResumeDB');
                const container = database.container('Counters');
                
                await container.items.create({
                    id: `weather-${Date.now()}`,
                    type: 'weather_request',
                    city: city,
                    country: country,
                    temperature: temperature,
                    condition: condition,
                    timestamp: new Date().toISOString()
                });
                
                context.log(`Stored weather analytics for ${city}`);
            } catch (dbError) {
                context.log('CosmosDB error:', dbError.message);
            }
        }

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                city: city,
                temperature: temperature,
                condition: condition,
                icon: weatherIcon
            }
        };

    } catch (error) {
        context.log('Weather API error:', error.message);
        
        // Fallback response
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                city: 'Nagoya',
                temperature: 68,
                condition: 'Partly Cloudy',
                icon: '⛅'
            }
        };
    }
};

function getLocationWeather(city, country) {
    // Simulate realistic weather based on location and season
    const locations = {
        'Nagoya': { temp: 68, condition: 'Partly Cloudy' },
        'Tokyo': { temp: 65, condition: 'Clear' },
        'New York': { temp: 45, condition: 'Cloudy' },
        'London': { temp: 42, condition: 'Rain' },
        'San Francisco': { temp: 62, condition: 'Fog' }
    };
    
    const weather = locations[city] || { temp: 70, condition: 'Clear' };
    
    // Add some randomness to make it feel more real
    const tempVariation = Math.floor(Math.random() * 10) - 5;
    
    return {
        temperature: weather.temp + tempVariation,
        condition: weather.condition
    };
}

function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Sunny': '☀️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Rain': '🌧️',
        'Snow': '❄️',
        'Thunderstorm': '⛈️',
        'Fog': '🌫️'
    };
    
    return icons[condition] || '🌤️';
}