/* eslint-disable camelcase */
async ({ accounts }) => {
  if (accounts.includes(null)) return [];
  // console.info('balances before', config.ptfin.main.url + path, accounts);
  const path = 'terminal/balance';
  const data = { accounts };

  return lib.ptfin.sendPost({ path, data });
};
