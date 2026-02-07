(key, value, options) => {
  if (process.env['redis_disabled'] === '1' || !lib.redis?.client) return Promise.resolve(null);
  if (options) return lib.redis.client.set(key, value, options);
  return lib.redis.client.set(key, value);
};
