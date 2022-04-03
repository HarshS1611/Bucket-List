import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send('THIS IS THE API WEBPAGE');
});
app.use('/posts', postsRouter);
app.use('/user', usersRouter);

const CONNECTION = 'mongodb+srv://HarshS1611:gaamabanta@cluster0.c4jr0.mongodb.net/bucketlist?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

mongoose.set('useFindAndModify', false);
