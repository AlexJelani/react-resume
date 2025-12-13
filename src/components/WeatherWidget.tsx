import React, { useEffect, useState } from 'react';

interface WeatherData {
    city: string;
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
                const response = await fetch('/api/weather');
                
                if (!response.ok) throw new Error('Weather unavailable');
                
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError('Weather unavailable');
                console.error('Weather widget error:', err);
            } finally {
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
            {weather.icon} {weather.temperature}°F {weather.city}
        </span>
    );
};

export default WeatherWidget;