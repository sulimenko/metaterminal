/* eslint-disable camelcase */
async ({ accounts, days = 5 }) => {
  const method = 'terminal_orders';
  console.log(config.ptfin.main.url + method, accounts, days);
  if (accounts.includes(null)) return [];

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api_token: config.ptfin.main.token, accounts, days }),
  });

  return res.json();
};
