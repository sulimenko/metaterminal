async ({ symbols, expirations }) => {
  // if (!Array.isArray(accounts)) return {};
  const path = 'terminal/get_options';
  const data = { symbols, expirations };

  const responce = await lib.ptfin.sendPost({ path, data });
  const result = {};
  for (const option of responce) {
    if (result[option.strike] === undefined) result[option.strike] = {};
    result[option.strike][option.type] = option;
  }
  return result;
};
