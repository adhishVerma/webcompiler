import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import { dbConnect } from './lib/connect';
import { compilerRouter } from './routes/compilerRouter';

const app = express();

app.use(express.json());
app.use(cors());
config();

app.get('/', (req, res) => {
    res.status(200).send('ok');
})

app.use('/editor', compilerRouter);

dbConnect();

app.listen(9000, () => {
    console.log("server started")
});

