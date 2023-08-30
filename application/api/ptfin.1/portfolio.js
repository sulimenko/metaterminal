({
  access: 'public',
  method: async ({ accounts }) => {
    return lib.ptfin.balances({ accounts });
  },
});
