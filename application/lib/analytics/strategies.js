async ({ user }) => {
  const path = 'analytics/strategies';
  const data = { user };

  return lib.ptfin.sendPost({ path, data });
};
