import express from 'express';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import userRouter from './routers/userRouter.mjs';
import apiRouter from './routers/apiRouter.mjs';
import { connectMongoDB } from './db.mjs';

const app = express();
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectMongoDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
const PORT = process.env.PORT || 6000;

app.use('/user',userRouter);
app.use('/api',apiRouter);
app.use('/',userRouter);
app.listen(PORT,()=>{
    console.log(`App Started at ${PORT}`);
});