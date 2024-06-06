({
  access: 'private',
  method: async ({ symbol }) => {
    console.log('metaterminal symbol :', symbol);
    const expirations = await lib.ptfin.optionExpirations({ symbol });
    console.log('metaterminal expiration :', expirations);
    return expirations;
  },
});
