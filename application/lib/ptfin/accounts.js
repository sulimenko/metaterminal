/* eslint-disable camelcase */
async ({ userId }) => {
  if (!userId) return {};
  const method = 'data/accounts';
  const data = { user: userId };

  return lib.ptfin.sendPost({ method, data });
};
