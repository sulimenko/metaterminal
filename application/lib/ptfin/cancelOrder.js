/* eslint-disable camelcase */
async ({ order }) => {
  const method = 'terminal/cancel_order';
  const data = { order };
  // console.info('deleteOrder: ', config.ptfin.main.url + method, order);

  return lib.ptfin.sendPost({ method, data });
};
