async ({ accounts }) => {
  if (!Array.isArray(accounts)) return {};

  const method = 'terminal/get_tn_acc';
  const data = { accounts };

  return lib.ptfin.sendPost({ method, data });
};
