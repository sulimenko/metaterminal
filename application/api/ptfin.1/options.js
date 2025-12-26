({
  access: 'private',
  method: async function ({ symbols, expirations }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.getOptions({ symbols, expirations });
  },
});
