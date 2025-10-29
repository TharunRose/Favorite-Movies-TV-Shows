import dotenv from 'dotenv';
import { AppDataSource } from './ds';
import { createApp } from './app';


dotenv.config();


const port = Number(process.env.PORT || 4000);


AppDataSource.initialize()
    .then(() => {
        console.log('Data source initialized');
        const app = createApp();
        app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
        process.exit(1);
    });