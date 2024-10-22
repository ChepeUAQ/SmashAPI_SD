// connections/redis.js

const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://172.17.0.3:6379'
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis server...');
  } catch (err) {
    console.error('Redis connection error: ', err);
  }
};

module.exports = {connectRedis, redisClient};