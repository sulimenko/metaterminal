/* eslint-disable camelcase */
async ({ id }) => {
  if (id === null) return [];
  const path = 'registration/profile';
  const data = { id };

  return lib.ptfin.sendPost({ path, data });
};
