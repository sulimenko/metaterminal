({
  access: 'public',
  method: async ({ keys, status, limit }) => {
    const alpaca = lib.utils.alpacaConnect(keys);
    const responce = lib.utils.makeResult('createOrder', { orders: [] });

    status = status && ['all', 'closed', 'open'].includes(status) ? status : 'open';
    limit = limit && typeof limit === 'number' ? limit : 20;

    responce.data.orders = await alpaca.getOrders({ status, limit });
    return responce;
  },
});
