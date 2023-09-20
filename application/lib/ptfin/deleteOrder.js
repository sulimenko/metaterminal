/* eslint-disable camelcase */
async ({ order }) => {
  const method = 'delete_order';

  console.log('deleteOrder: ', config.ptfin.main.url + method, order);

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api_token: config.ptfin.main.token, order }),
  });

  return res.json();
};
