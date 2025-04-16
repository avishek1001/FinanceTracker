import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import finances from './routes/finances.js';


const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connection Successful'))
    .catch((e) => console.log(e));

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/finances', finances);



app.listen(PORT, () => {
    console.log(`Listening from Port ${PORT}`);
})
