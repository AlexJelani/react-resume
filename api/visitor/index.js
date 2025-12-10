const { app } = require('@azure/functions');

// Simple in-memory counter (resets on function restart)
let visitorCount = 0;

app.http('visitor', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // Increment counter by 1 each time
            visitorCount++;
            
            context.log(`Visitor count: ${visitorCount}`);
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ count: visitorCount })
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