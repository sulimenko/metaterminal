({
  access: 'public',
  method: async () => {
    lib.log.info('healthz');
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  },
});
