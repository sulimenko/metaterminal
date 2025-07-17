/* eslint-disable camelcase */
async ({ accounts }) => {
  if (accounts.includes(null)) return [];
  // console.info('balances before', config.ptfin.main.url + method, accounts);
  const method = 'terminal/balance';
  const data = { accounts };

  return lib.ptfin.sendPost({ method, data });
};
