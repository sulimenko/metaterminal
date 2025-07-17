async ({ accounts, days, force }) => {
  if (accounts.includes(null)) return [];
  const method = 'terminal/orders';
  const data = { accounts, days, force };
  // console.info(config.ptfin.main.url + method, accounts, days, force);

  return lib.ptfin.sendPost({ method, data });
};
