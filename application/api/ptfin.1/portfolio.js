({
  access: 'private',
  method: async function ({ accounts }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.balances({ accounts });
  },
});
