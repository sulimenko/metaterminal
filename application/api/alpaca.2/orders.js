({
  access: 'public',
  method: async function ({ keys, status, limit }) {
    lib.log.info({ params: arguments[0] });
    const alpaca = lib.utils.alpacaConnect(keys);
    const responce = lib.utils.makeResult('orders', { orders: [] });

    status = status && ['all', 'closed', 'open'].includes(status) ? status : 'open';
    limit = limit && typeof limit === 'number' ? limit : 20;

    responce.data.orders = await alpaca.getOrders({ status, limit });
    return responce;
  },
});
