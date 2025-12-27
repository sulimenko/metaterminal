({
  access: 'private',
  method: async function ({ order }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.cancelOrder({ order });
  },
});
