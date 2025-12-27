({
  access: 'private',
  method: async function ({ accounts }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.balances({ accounts });
  },
});
