async ({ symbols, expirations }) => {
  // if (!Array.isArray(accounts)) return {};
  const path = 'terminal/get_options';
  const data = { symbols, expirations };

  return lib.ptfin.sendPost({ path, data });
};
