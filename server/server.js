import util from 'util';

import express from 'express';
import morgan from 'morgan';

import getEnv from '../lib/utils/get-env';
/*
  import router from './router/index';
  console.log(util.inspect(router, false, null, true));
  const { Router1, Router2 } = router;
*/

getEnv()

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/REST-TEST', RESTRouter, messagesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
