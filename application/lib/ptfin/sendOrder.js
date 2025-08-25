/* eslint-disable camelcase */
async ({ data, instrument }) => {
  const path = 'data/new_recommendation';
  const send_data = { data, instrument };

  // return lib.ptfin.sendPost({ path, data: send_data });
  domain.ptfin.queue.addTask({ path, data: send_data });
  // return domain.ptfin.send(send_data);
  // const result = await domain.ptfin.send(send_data);
  // return result;
};
