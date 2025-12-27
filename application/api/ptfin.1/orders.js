({
  access: 'private',
  method: async function ({ accounts, days = 5, force = false }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.orders({ accounts, days, force });
  },
});
