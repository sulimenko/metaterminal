async ({ user }) => {
  if (!user) return [];
  const method = 'data/available_lists';
  const data = { user };

  return lib.ptfin.sendPost({ method, data });
};
