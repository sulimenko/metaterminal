({
  access: 'private',
  method: async ({ symbol }) => {
    return lib.ptfin.updateOptions({ symbol });
  },
});
