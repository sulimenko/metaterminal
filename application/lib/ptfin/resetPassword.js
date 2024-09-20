/* eslint-disable camelcase */

async ({ login, email }) => {
  const method = 'registration/reset_password';
  const data = { login, email };

  return lib.ptfin.sendPost({ method, data });
};
