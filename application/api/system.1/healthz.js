({
  access: 'public',
  method: async () => {
    let buildInfo = {};
    try {
      buildInfo = require('../../../build-info.json');
    } catch {
      buildInfo = {};
    }

    const version =
      buildInfo.version || require('../../../package.json').version;

    return {
      status: 'ok',
      version,
      hash: buildInfo.hash,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  },
});
