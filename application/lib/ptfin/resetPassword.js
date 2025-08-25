/* eslint-disable camelcase */

async ({ login, email }) => {
  const path = 'registration/reset_password';
  const data = { login, email };

  return lib.ptfin.sendPost({ path, data });
};
