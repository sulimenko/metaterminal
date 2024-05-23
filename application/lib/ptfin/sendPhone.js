/* eslint-disable camelcase */
async ({ data }) => {
  const method = 'data/phone';
  const send_data = { data };

  return lib.ptfin.sendPost({ method, data: send_data });
};
