({
  access: 'private',
  method: async function ({ symbol }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.updateOptions({ symbol });
  },
});
