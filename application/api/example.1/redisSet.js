({
  access: 'public',
  method: async function ({ key, value }) {
    lib.log.info({ args: Array.from(arguments) });
    const result = await lib.redis.set(key, value);
    return { result };
  },
});
