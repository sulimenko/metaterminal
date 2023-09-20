({
  access: 'private',
  method: async ({ order }) => {
    return lib.ptfin.deleteOrder({ order });
  },
});
