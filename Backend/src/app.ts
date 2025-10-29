import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies';
import { errorHandler } from './middleware/errorHandler';


export const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());


    app.use('/api/movies', moviesRouter);


    app.get('/health', (req, res) => res.json({ ok: true }));


    app.use(errorHandler);


    return app;
};