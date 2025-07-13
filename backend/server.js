import http from 'http';
import app from './app.js';
import connectToDb from './db/db.js';

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectToDb();
        const server = http.createServer(app);
        
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Server startup failed', error);
        process.exit(1);
    }
}

startServer();