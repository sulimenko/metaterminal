({
  access: 'public',
  method: async ({ accounts }) => {
    console.log('portfolio 2222222');
    return lib.ptfin.balances({ accounts });
  },
});
