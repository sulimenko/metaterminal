async ({ symbol, expiration }) => {
  if (!symbol) return {};
  if (!expiration) return {};
  const method = 'terminal/get_options';
  const data = { symbol, expiration };

  return lib.ptfin.sendPost({ method, data });
};
