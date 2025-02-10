/* eslint-disable camelcase */
async (event) => {
  console.warn('tn updateStatus sent orders_id: ', JSON.stringify(event.orders.map((each) => each.id)));
  const method = 'tn/response';
  const data = { data: { command: 'orderStatus', account: event.account, orders: event.orders } };

  const result = lib.ptfin.sendPost({ method, data });
  console.warn('tn updateStatus result: ', JSON.stringify(result));
  return result;
};
