({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  },
});
