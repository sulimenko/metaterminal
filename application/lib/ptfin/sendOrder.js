/* eslint-disable camelcase */
async ({ data, instrument }) => {
  const method = 'data/new_recommendation';
  const send_data = { data, instrument };

  // return lib.ptfin.sendPost({ method, data: send_data });
  domain.ptfin.queue.addTask({ method, data: send_data });
  // return domain.ptfin.send(send_data);
  // const result = await domain.ptfin.send(send_data);
  // console.warn(typeof result, result);
  // return result;
};
