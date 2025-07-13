({
  url: config.ptfin.main.url + 'data',
  token: config.ptfin.main.token,
  limits: [
    { calls: 1, per: '1s' },
    { calls: 10, per: '1m' },
  ],
});
