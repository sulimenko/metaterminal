/* eslint-disable camelcase */
async (event) => {
  const method = 'tn/response';
  const result = await metarhia.metautil
    .fetch(config.ptfin.main.url + method, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
      },
      body: JSON.stringify({
        api_token: config.ptfin.main.token,
        data: { command: 'orderStatus', account: event.account, orders: event.orders },
      }),
    })
    .then((res) => (res.status === 200 ? res.json() : res.text()));

  console.warn('tn updateStatus check orders_id: ', JSON.stringify(result));
  return result;
};
