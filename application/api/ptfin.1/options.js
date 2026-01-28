({
  access: 'private',
  method: async ({ instrument, expiration }) => {
    return lib.ptfin.getOptions({ instrument, expiration });
  },
});
