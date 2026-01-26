async () => {
  if (application.worker.id === 'W1') {
    console.debug('Connect to redis');
  }
  const url = process.env.redis_url;
  const client = url ? npm.redis.createClient({ url }) : npm.redis.createClient();
  db.redis.client = client;
  if (!lib.redis) {
    lib.redis = {};
  }
  lib.redis.client = client;
  client.on('error', () => {
    if (application.worker.id === 'W1') {
      console.warn('No redis service detected, so quit client');
    }
    client.quit();
  });
  try {
    await client.connect();
  } catch (error) {
    if (application.worker.id === 'W1') {
      console.warn('Redis connect failed:', error.message);
    }
  }
};
