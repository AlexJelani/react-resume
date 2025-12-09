import React, { useEffect, useState } from 'react';

interface VisitorCounterProps {
    apiUrl: string;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ apiUrl }) => {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const updateVisitorCount = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if (!response.ok) throw new Error('Failed to update count');
                
                const data = await response.json();
                setCount(data.count);
            } catch (err) {
                setError('Unable to load visitor count');
                console.error('Visitor counter error:', err);
            }
        };

        updateVisitorCount();
    }, [apiUrl]);

    if (error) return <div className="text-muted small">{error}</div>;
    if (count === null) return <div className="text-muted small">Loading...</div>;

    return (
        <div className="visitor-counter text-muted small">
            Visitors: {count.toLocaleString()}
        </div>
    );
};

export default VisitorCounter;
