async ({ userId }) => {
  if (!userId) return {};
  const path = 'data/accounts';
  const data = { user: userId };

  return lib.ptfin.sendPost({ path, data });
};
