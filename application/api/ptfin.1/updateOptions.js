({
  access: 'private',
  method: async function ({ symbol }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.updateOptions({ symbol });
  },
});
