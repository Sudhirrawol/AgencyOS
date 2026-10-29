import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import "dotenv/config"
import { connectDb } from './config/db.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;


app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5001",'http://localhost:5000',],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next();
})

app.use('/api/auth', authRouter);

// Temporary route to test global error handling
app.get("/api/test-error", (req, res, next) => {
    next(new Error("This is a test error"));
});

app.use(errorHandler)

app.get('/', (req, res) => {
    res.json({
        message: "AgencyOS Auth Service is Running"
    })
});
// the api route defined which function runs when a particlar http method an url pats are requested

app.get('/api/auth/health', (req, res) => {
    res.status(200).json({
        service: "auth-service",
        status: "UP",
        timeStamp: new Date().toISOString()
    });
});


const startServer = async (): Promise<void> => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Auth Service running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("failed to start AUth service", error);
        process.exit(1)
    }

}
void startServer()
// npx is to run the page executable
// tsx executes our typescript files during evelopment

