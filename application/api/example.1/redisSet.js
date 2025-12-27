({
  access: 'public',
  method: async function ({ key, value }) {
    lib.log.info({ params: arguments[0] });
    const result = await lib.redis.set(key, value);
    return { result };
  },
});
