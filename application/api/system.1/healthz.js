({
  access: 'public',
  method: async () => {
    const readJson = (filePath) => {
      try {
        const data = node.fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      } catch {
        return {};
      }
    };

    const rootPath = process.cwd();
    const buildInfoPath = node.path.join(rootPath, 'build-info.json');
    const packagePath = node.path.join(rootPath, 'package.json');

    const buildInfo = readJson(buildInfoPath);
    const packageInfo = readJson(packagePath);

    const version = buildInfo.version || packageInfo.version;

    return {
      status: 'ok',
      version,
      hash: buildInfo.hash,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  },
});
