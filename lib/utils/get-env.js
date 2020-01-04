import path from 'path';
import dotenv from 'dotenv';

const getEnvironment = () => {
  const envPath = path.resolve(__dirname, '../../.env');
  dotenv.config({
    path: envPath
  });
};

export default getEnvironment;
