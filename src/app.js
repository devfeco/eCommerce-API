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
//import routes
import AuthRouter from './routes/AuthRouter.js'
import UserRouter from './routes/UserRouter.js'

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

//Routers
app.use('/api/v1',AuthRouter);
app.use('/api/v1',UserRouter);


app.use(errorMiddleware);

export default app;