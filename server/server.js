import util from 'util';

import express from 'express';

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

if (app.get('env') === 'development') {
  console.log('Configuring Access Control Allow Origin header for Local Development.');
  app.use('/*', (req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      `${req.get('origin')}`,
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, DELETE, PUT'
    )
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
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
