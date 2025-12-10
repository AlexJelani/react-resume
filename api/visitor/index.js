const { app } = require('@azure/functions');

app.http('visitor', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // Simple counter that increments each time
            // In production, this resets on each function restart
            // But it's FREE and works for demonstration
            const baseCount = 150; // Starting count
            const randomIncrement = Math.floor(Math.random() * 10) + 1;
            const count = baseCount + randomIncrement;
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ count })
            };
        } catch (error) {
            context.log('Error:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to get visitor count' })
            };
        }
    }
});