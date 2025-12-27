({
  access: 'private',
  method: async function ({ id }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.documents({ id });
  },
});
