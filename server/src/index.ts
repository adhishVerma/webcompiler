import express, { Request, Response } from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import { dbConnect } from './lib/connect';
import { compilerRouter } from './routes/compilerRouter';

const app = express();

app.use(express.json());
app.use(cors());
config();

app.get('/', (req:Request, res:Response) => {
    res.status(200).send('ok');
})
app.use('/editor', compilerRouter);

dbConnect();

const PORT  = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log("server started", PORT)
});

