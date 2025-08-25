/* eslint-disable camelcase */
async ({ order }) => {
  const path = 'terminal/cancel_order';
  const data = { order };
  // console.info('deleteOrder: ', config.ptfin.main.url + path, order);

  return lib.ptfin.sendPost({ path, data });
};
