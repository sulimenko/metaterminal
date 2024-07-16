({
  access: 'private',
  method: async ({ id }) => {
    return lib.ptfin.documents({ id });
  },
});
