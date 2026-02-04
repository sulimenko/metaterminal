(key) => {
  if (process.env['redis_disabled'] === '1' || !lib.redis?.client) return Promise.resolve(null);
  return lib.redis.client.get(key);
};
