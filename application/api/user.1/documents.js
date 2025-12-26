({
  access: 'private',
  method: async function ({ id }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.documents({ id });
  },
});
