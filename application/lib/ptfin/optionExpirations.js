async ({ symbol }) => {
  if (!symbol) return {};
  const path = 'terminal/get_expiration';
  const data = { symbol };
  // console.info('optionExpirations symbol :', data);
  return lib.ptfin.sendPost({ path, data });
};
