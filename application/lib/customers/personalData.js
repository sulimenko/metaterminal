/* eslint-disable camelcase */
async ({ id = null }) => {
  if (id === null) return [];
  const method = 'registration/personal';
  const data = { id };

  return lib.ptfin.sendPost({ method, data });
};
