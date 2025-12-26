({
  access: 'public',
  method: async function ({ keys, orderId }) {
    lib.log.info({ args: Array.from(arguments) });
    // console.info(keys);
    const alpaca = lib.utils.alpacaConnect(keys);
    const responce = lib.utils.makeResult('cancelOrder', { orders: [] });

    await alpaca.cancelOrder(orderId);
    responce.data.orders.push(await alpaca.getOrder(orderId));
    return responce;
  },
});
