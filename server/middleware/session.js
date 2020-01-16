import uuid from 'uuid/v4';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

const redisClient = redis.createClient();
const RedisStore = connectRedis(session);

redisClient.on('error', console.error);
redisClient.on('connect', () => console.log("Redis Connection Initialized"));

const store = new RedisStore({ client: redisClient });

const sessionParser = session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
});

export { sessionParser }