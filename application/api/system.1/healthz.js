({
  access: 'public',
  method: async () => ({
    status: 'ok',
    version: require('../../../package.json').version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }),
});
