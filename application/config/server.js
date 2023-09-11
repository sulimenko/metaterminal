({
  host: 'ptfin.kz',
  balancer: 8000,
  protocol: 'http',
  ports: [8001, 8002],
  nagle: false,
  timeouts: {
    bind: 2000,
    start: 30000,
    stop: 5000,
    request: 5000,
    watch: 1000,
  },
  queue: {
    concurrency: 1000,
    size: 2000,
    timeout: 3000,
  },
  scheduler: {
    concurrency: 10,
    size: 2000,
    timeout: 3000,
  },
  workers: {
    pool: 2,
    wait: 2000,
    timeout: 10000,
  },
  cors: {
    origin: '*',
  },
});
