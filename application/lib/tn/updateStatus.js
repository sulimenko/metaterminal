/* eslint-disable camelcase */
async (event) => {
  console.warn('tn updateStatus sent orders_id: ', JSON.stringify(event.orders.map((each) => each.id)));
  const method = 'tn/response';
  const data = { data: { command: 'orderStatus', account: event.account, orders: event.orders } };
  // const result = await metarhia.metautil
  //   .fetch(config.ptfin.main.url + method, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
  //     },
  //     body: JSON.stringify({
  //       api_token: config.ptfin.main.token,
  //       data,
  //     }),
  //   })
  //   .then((res) => (res.status === 200 ? res.json() : res.text()));
  const result = lib.ptfin.sendPost({ method, data });
  console.warn('tn updateStatus result: ', JSON.stringify(result));
  return result;
};
