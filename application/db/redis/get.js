(key) =>
  new Promise((resolve, reject) => {
    if (process.env['redis_disabled'] === '1' || !lib.redis?.client) {
      resolve(null);
      return;
    }
    lib.redis.client.get(key, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
