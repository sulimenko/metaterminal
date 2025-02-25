({
  access: 'private',
  method: async ({ accounts, days = 5, force = false }) => {
    return lib.ptfin.orders({ accounts, days, force });
  },
});
