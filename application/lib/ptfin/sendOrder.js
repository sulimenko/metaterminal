/* eslint-disable camelcase */
async ({ data, instrument }) => {
  const method = 'data/new_recommendation';
  const send_data = { data, instrument };

  return lib.ptfin.sendPost({ method, data: send_data });
};
