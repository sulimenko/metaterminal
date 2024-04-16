/* eslint-disable camelcase */
async ({ accounts, days = 5 }) => {
  if (accounts.includes(null)) return [];
  const method = 'terminal/orders';
  const data = { accounts, days };
  // console.log(config.ptfin.main.url + method, accounts, days);

  return lib.ptfin.sendPost({ method, data });
};
