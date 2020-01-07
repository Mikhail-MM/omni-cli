import util from 'util';

import express from 'express';

// import morgan from 'morgan';
import { handleError } from '../lib/utils/logger';
import getEnv from '../lib/utils/get-env';

import { establishMongooseConnection } from '../lib/mongo/mongoose-db';
import { registerMongooseUserPathways } from './router/users';

/*
  import router from './router/index';
  console.log(util.inspect(router, false, null, true));
  const { Router1, Router2 } = router;
*/

getEnv()

const app = express();

// app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

establishMongooseConnection()
  .then(connection => {
    if (connection.success) {
      console.log(connection.message);
    };
  }).catch(err => {
    console.log("Catching mongoose error...")
    console.log(err);
  })

// app.use('/REST-TEST', RESTRouter, messagesRouter);
app.get('/', (req, res) => {
  res.send('Hello!')
});

app.get('/api', (req, res) => {
  res.send('NginX proxy should forward around this, PERHAPS?')
});

registerMongooseUserPathways(app);

// Universal Error Handler

app.use('/', (err, req, res, next) => {
  handleError(err);
  res.status(err.status || 500).send(err.message);
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
