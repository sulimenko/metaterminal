async ({ instrument, expiration }) => {
  // if (!Array.isArray(accounts)) return {};
  const path = 'terminal/get_options';
  const data = { instrument, expiration };

  return lib.ptfin.sendPost({ path, data });
};
