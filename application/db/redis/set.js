(key, value) =>
  new Promise((resolve, reject) => {
    if (process.env['redis_disabled'] === '1' || !lib.redis?.client) {
      resolve(null);
      return;
    }
    lib.redis.client.set(key, value, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
