async ({ symbol }) => {
  if (!symbol) return {};
  const method = 'terminal/get_expiration';
  const data = { symbol };
  // console.log('optionExpirations symbol :', data);
  return lib.ptfin.sendPost({ method, data });
};
