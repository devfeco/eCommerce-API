import express from 'express';
import helmet from 'helmet';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import corsOptions from './config/corsOptions.js'
import {logger} from './middleware/logEvents.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js'
import {apiLimiter} from './utils/limiter.js'
import AuthRouter from './routes/AuthRouter.js'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/api/',apiLimiter);

app.use('/api/v1',AuthRouter);

app.post('/test',async (req,res,next) => {
    const card = await Card.create(req.body);
    res.status(201).json({
        status:"SUCCESS",
        statusCode:201,
        card
    })
});

app.use(errorMiddleware);

export default app;