({
  access: 'public',
  method: async function ({ key }) {
    lib.log.info({ args: Array.from(arguments) });
    const result = await lib.redis.get(key);
    return { result };
  },
});
