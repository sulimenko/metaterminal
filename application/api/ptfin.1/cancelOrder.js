({
  access: 'private',
  method: async ({ order }) => {
    return lib.ptfin.cancelOrder({ order });
  },
});
