async ({ accounts, days, force }) => {
  if (accounts.includes(null)) return [];
  const path = 'terminal/orders';
  const data = { accounts, days, force };
  // console.info(config.ptfin.main.url + path, accounts, days, force);

  return lib.ptfin.sendPost({ path, data });
};
