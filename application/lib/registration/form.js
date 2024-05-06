/* eslint-disable camelcase */
async ({ form }) => {
  console.warn('registration form: ', JSON.stringify(form));
  const method = 'terminal/registration';
  const result = lib.ptfin.sendPost({ method, data: { form } });
  console.warn('registration form: ', JSON.stringify(result));
  return result;
};
