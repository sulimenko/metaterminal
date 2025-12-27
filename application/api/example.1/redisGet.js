({
  access: 'public',
  method: async function ({ key }) {
    lib.log.info({ params: arguments[0] });
    const result = await lib.redis.get(key);
    return { result };
  },
});
