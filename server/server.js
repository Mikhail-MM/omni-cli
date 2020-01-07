import util from 'util';

import express from 'express';
// import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import { handleError } from '../lib/utils/logger';
import getEnv from '../lib/utils/get-env';

import { establishMongooseConnection } from '../lib/mongo/mongoose-db';
import { registerMongooseUserPathways } from './router/users';

getEnv()

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())

if (app.get('env') === 'development') {
  console.log('Configuring Access Control Allow Origin header for Local Development.');
  app.use('/*', (req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      `${req.get('origin')}`,
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
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

app.use('/', (req, res, next) => {
  // Cookie Middleware  
  // Send back secure HTTPONLY cookie on successful auth
  // Can we send secure on local dev?
  const authTimeOut = 3 * 60 * 60 * 1000 // 3 hrs
  console.log("Cookies: ");
  console.log(req.cookies);
  res.header(
    'Set-Cookie',
    `Stuff=HI!; Max-Age=${authTimeOut};`
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello!')
});

app.get('/api', (req, res) => {
  res.send('NginX proxy should forward around this, PERHAPS?')
});

// Register new users and store in MongoDB
registerMongooseUserPathways(app);

// Universal Error Handler
app.use('/', (err, req, res, next) => {
  handleError(err);
  res.status(err.status || 500).json({ error: err.stack, message: err.message });
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
