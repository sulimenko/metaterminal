({
  access: 'private',
  method: async ({ symbol }) => {
    const expirations = await lib.ptfin.optionExpirations({ symbol });
    console.log(expirations);
    return expirations;
  },
});
