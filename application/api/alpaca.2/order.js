({
  access: 'public',
  method: async ({ keys, orderId }) => {
    // console.log(keys);
    const alpaca = lib.utils.alpacaConnect(keys);
    const responce = lib.utils.makeResult('getOrder', { orders: [] });
    responce.data.orders.push(await alpaca.getOrder(orderId));
    return responce;
  },
});
