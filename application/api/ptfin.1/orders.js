({
  access: 'private',
  method: async function ({ accounts, days = 5, force = false }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.orders({ accounts, days, force });
  },
});
