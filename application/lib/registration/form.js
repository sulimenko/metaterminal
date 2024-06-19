/* eslint-disable camelcase */
async ({ form }) => {
  const method = 'registration/data';
  const result = await lib.ptfin.sendPost({ method, data: { form } });
  console.warn('registration form: ', JSON.stringify(result));
  return result;
};
