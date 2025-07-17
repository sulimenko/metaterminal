({
  router({ method, args, verb, headers }) {
    const ip = context.client.ip;
    console.info({ method, args, ip, verb, headers });
    return {};
  },
});
