/* eslint-disable camelcase */
async (event) => {
  const method = 'alpaca/response';
  const result = await metarhia.metautil
    .fetch(config.ptfin.main.url + method, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
      },
      body: JSON.stringify({ api_token: config.ptfin.main.token, data: event.order }),
    })
    .then((res) => (res.status === 200 ? res.json() : res.text()));
  console.warn('tn updateStatus check orders_id: ', JSON.stringify(result));
  return result;
};
