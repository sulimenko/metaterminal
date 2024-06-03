async ({ symbol }) => {
  if (!symbol) return {};
  const method = 'terminal/get_expiration';
  const data = { symbol };

  return lib.ptfin.sendPost({ method, data });
};
