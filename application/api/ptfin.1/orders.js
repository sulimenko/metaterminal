({
  access: 'private',
  method: async ({ accounts, days = 5 }) => {
    return lib.ptfin.orders({ accounts, days });
  },
});
