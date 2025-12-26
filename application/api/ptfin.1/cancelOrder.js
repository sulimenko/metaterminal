({
  access: 'private',
  method: async function ({ order }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.cancelOrder({ order });
  },
});
