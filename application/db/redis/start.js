async () => {
  // Если redis_disabled=1, то не подключаемся к редису и сразу выходим (сценарий тестового запуска)
  if (process.env['redis_disabled'] === '1') {
    if (application.worker.id === 'W1') {
      console.warn('Redis disabled by env (redis_disabled=1)');
    }
    db.redis.client = null;
    if (!lib.redis) {
      lib.redis = {};
    }
    lib.redis.client = null;
    return;
  }

  if (application.worker.id === 'W1') {
    console.info('Connect to redis');
  }
  const url = process.env.redis_url;
  const client = url ? npm.redis.createClient({ url }) : npm.redis.createClient(config.redis);
  db.redis.client = client;
  if (!lib.redis) {
    lib.redis = {};
  }
  lib.redis.client = client;
  client.on('error', async (error) => {
    if (application.worker.id === 'W1') {
      console.warn('No redis service detected, so quit client');
      const err = new Error('No redis', { cause: error });
      console.error(err);
      await client.disconnect();
    }
  });
  try {
    await client.connect();
  } catch (error) {
    if (application.worker.id === 'W1') {
      console.warn('Redis connect failed:', error.message);
    }
  }
};
