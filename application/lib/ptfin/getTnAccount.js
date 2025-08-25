async ({ accounts }) => {
  if (!Array.isArray(accounts)) return {};

  const path = 'terminal/get_tn_acc';
  const data = { accounts };

  return lib.ptfin.sendPost({ path, data });
};
