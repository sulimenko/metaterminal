async ({ symbol }) => {
  if (!symbol) return {};
  const method = 'terminal/get_expiration';
  const data = { symbol };
  // console.info('optionExpirations symbol :', data);
  return lib.ptfin.sendPost({ method, data });
};
