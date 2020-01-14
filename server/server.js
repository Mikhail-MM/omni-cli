import util from 'util';
import uuid from 'uuid/v4';
import session from 'express-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import { handleError } from '../lib/utils/logger';
import getEnv from '../lib/utils/get-env';

import { establishMongooseConnection } from '../lib/mongo/mongoose-db';
import { usersRouter } from './router/users';
import { initSession } from './middleware/session'
getEnv()

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(initSession);

app.use('/', (req, res, next) => {
  console.log("Hitting the rest of the middleware")
  console.log("Log sessionID")
  console.log(req.sessionID)
  next();
})

if (app.get('env') === 'development') {
  console.log('Configuring Access Control Allow Origin header for Local Development.');
  app.use('*', (req, res, next) => {
    /* res.header(
      'Access-Control-Allow-Origin',
      `${req.get('origin')}`,
    ); */
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie',
    )
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, DELETE, PUT'
    )
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
}

if (app.get('env') === 'production') {
  // Trust DigitalOcean - NginX Proxy 
  // https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 'loopback', process.env.DIGITAL_OCEAN_DROPLET_IP)
}

establishMongooseConnection()
  .then(connection => {
    if (connection.success) {
      console.log(connection.message);
    };
  }).catch(err => {
    console.log("Catching mongoose error...")
    console.log(err);
  })


app.get('/', (req, res) => {
  res.send('GET /')
});

app.get('/api', (req, res) => {
  res.send('GET /api')
});

app.use('/api', usersRouter);

// Universal Error Handler
app.use('*', (err, req, res, next) => {
  handleError(err);
  res.status(err.status || 500).json({ error: err.stack, message: err.message });
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
