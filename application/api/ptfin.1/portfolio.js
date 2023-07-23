/* eslint-disable camelcase */
({
  access: 'public',
  // eslint-disable-next-line no-unused-vars
  method: async ({ account_id }) => {
    return lib.ptfin.balances({ accounts: [account_id] });
    // return lib.ptfin.testfetch();
  },
});
