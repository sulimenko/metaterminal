async ({ symbol }) => {
  if (!symbol) return {};
  const method = 'terminal/get_expiration';
  const data = { symbol };
  console.log('metaterminal lib symbol :', data);
  return lib.ptfin.sendPost({ method, data });
};
