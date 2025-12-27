({
  access: 'private',
  method: async function ({ symbols, expirations }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.getOptions({ symbols, expirations });
  },
});
