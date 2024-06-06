async ({ symbol }) => {
  if (!symbol) return {};
  const method = 'terminal/update_options';
  const data = { symbol };
  return lib.ptfin.sendPost({ method, data });
};
