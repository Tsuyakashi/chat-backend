const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const chat = express();

chat.use(express.urlencoded({ extended: true }));
chat.use(express.json());

chat.use('/', require('./routes/api/chats'));


const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(() =>{
    console.log('MongoDB connected');
    chat.listen(3000, () => {
        console.log('Server is started on 3000 port');
    });
}).catch(err => {
    console.error('Unable connecting to MongoDB', err);
    process.exit(1);
})