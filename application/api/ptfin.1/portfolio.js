({
  access: 'private',
  method: async ({ accounts }) => {
    return lib.ptfin.balances({ accounts });
  },
});
