({
  access: 'private',
  method: async ({ symbols, expirations }) => {
    return lib.ptfin.getOptions({ symbols, expirations });
  },
});
