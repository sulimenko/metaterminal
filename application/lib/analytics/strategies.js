async ({ user }) => {
  const method = 'analytics/strategies';
  const data = { user };

  return lib.ptfin.sendPost({ method, data });
};
