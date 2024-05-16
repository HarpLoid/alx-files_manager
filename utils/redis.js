// contains RedisClient Class
import redis from 'redis';

class RedisClient {
  constructor() {
    // create client
    this.client = redis.createClient();

    // handle errors
    this.client.on('error', (err) => {
      console.error('Error: ', err);
    });
  }

  isAlive() {
    // return true on connection
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
const redisClient = new RedisClient();

export default redisClient;
