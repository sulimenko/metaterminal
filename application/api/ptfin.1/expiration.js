({
  access: 'private',
  method: async ({ symbol }) => {
    // console.log('expiration:', symbol);
    const expirations = await lib.ptfin.optionExpirations({ symbol });
    // console.log('expiration return:', expirations);
    return expirations;
  },
});
