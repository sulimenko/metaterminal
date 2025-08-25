async ({ symbol }) => {
  if (!symbol) return {};
  const path = 'terminal/update_options';
  const data = { symbol };
  return lib.ptfin.sendPost({ path, data });
};
