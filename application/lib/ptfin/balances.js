/* eslint-disable camelcase */
async ({ accounts }) => {
  const method = 'terminal/balance';
  // console.log('balances before', config.ptfin.main.url + method, accounts);
  if (accounts.includes(null)) return [];

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify({ api_token: config.ptfin.main.token, accounts }),
  });

  return res.json();
};
