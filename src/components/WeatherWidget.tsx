import React, { useEffect, useState } from 'react';

interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    condition: string;
    icon: string;
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Try to get user's location using browser geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            
                            // Send coordinates to our API
                            const response = await fetch('/api/weather', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ lat: latitude, lon: longitude })
                            });
                            
                            if (response.ok) {
                                const data = await response.json();
                                setWeather(data);
                            } else if (response.status === 404) {
                                // Local development - API not running
                                setWeather({
                                    city: 'Local Dev',
                                    country: 'Test',
                                    temperature: 72,
                                    condition: 'Clear',
                                    icon: '☀️'
                                });
                            } else {
                                throw new Error('Weather API failed');
                            }
                            setLoading(false);
                        },
                        (error) => {
                            console.log('Geolocation denied or failed');
                            setError('Location access required for weather');
                            setLoading(false);
                        }
                    );
                } else {
                    // Browser doesn't support geolocation
                    setError('Geolocation not supported');
                    setLoading(false);
                }
            } catch (err) {
                // Local development fallback
                if (err instanceof Error && err.message.includes('fetch')) {
                    setWeather({
                        city: 'Local Dev',
                        country: 'Test',
                        temperature: 72,
                        condition: 'Clear',
                        icon: '☀️'
                    });
                } else {
                    setError('Weather unavailable');
                }
                console.error('Weather widget error:', err);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <span className="text-light">🌤️ Loading...</span>;
    if (error) return <span className="text-muted">🌤️ Weather unavailable</span>;
    if (!weather) return null;

    return (
        <span className="text-light">
            {weather.icon} {weather.temperature}°F {weather.city}, {weather.country}
        </span>
    );
};

export default WeatherWidget;