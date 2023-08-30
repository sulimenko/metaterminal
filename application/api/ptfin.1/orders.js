({
  access: 'public',
  method: async ({ accounts, days = 5 }) => {
    console.log(accounts, days);
    return lib.ptfin.orders({ accounts, days });
  },
});
