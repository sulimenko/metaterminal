({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  },
});
