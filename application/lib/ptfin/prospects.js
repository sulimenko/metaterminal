async ({ user }) => {
  if (!user) return [];
  const path = 'data/available_lists';
  const data = { user };

  return lib.ptfin.sendPost({ path, data });
};
