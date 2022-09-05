import router from './ivr/router';
import logger from 'morgan';
import bodyParser from 'body-parser';
import express, { Express } from 'express';

const app: Express = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/ivr', router);

export default app;