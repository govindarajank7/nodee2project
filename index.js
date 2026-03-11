import express from 'express';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import router from './routers/userRouter.mjs';
import { connectMongoDB } from './db.mjs';

const app = express();
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectMongoDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
const PORT = process.env.PORT || 6000;

app.use('/login',router);
app.use('/api',router);
app.listen(PORT,()=>{
    console.log(`App Started at ${PORT}`);
});