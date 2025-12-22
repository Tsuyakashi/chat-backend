import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import mongoose from 'mongoose';
import chatRoutes from './routes/api/chatRoutes';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', chatRoutes);

const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/chat";

mongoose.connect(MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
        console.log('Server is started on 3000 port');
    });
}).catch((err: Error) => {
    console.error('Unable connecting to MongoDB', err);
    process.exit(1);
});