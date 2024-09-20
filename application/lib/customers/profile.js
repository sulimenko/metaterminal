/* eslint-disable camelcase */
async ({ id }) => {
  if (id === null) return [];
  const method = 'registration/profile';
  const data = { id };

  return lib.ptfin.sendPost({ method, data });
};
