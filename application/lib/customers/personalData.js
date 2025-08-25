/* eslint-disable camelcase */
async ({ id = null }) => {
  if (id === null) return [];
  const path = 'registration/personal';
  const data = { id };

  return lib.ptfin.sendPost({ path, data });
};
