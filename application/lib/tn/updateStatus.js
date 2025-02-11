/* eslint-disable camelcase */
async (event) => {
  // console.warn('tn updateStatus sent orders_id: ', JSON.stringify(event.orders.map((each) => each.id)));
  const method = 'tn/response';
  const data = { data: { command: 'orderStatus', account: event.account, orders: event.orders } };

  lib.ptfin
    .sendPost({ method, data })
    .then((result) => console.warn('tn updateStatus result ' + event.account + ': ' + JSON.stringify(result).substring(0, 200)));
  // return void console.log('sent data: ' + JSON.stringify(data) );
};
