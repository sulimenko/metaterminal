async ({ symbols, expirations }) => {
  // if (!Array.isArray(accounts)) return {};
  const method = 'terminal/get_options';
  const data = { symbols, expirations };

  return lib.ptfin.sendPost({ method, data });
};
