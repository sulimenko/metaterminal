({
  access: 'private',
  method: async ({ symbol }) => {
    // console.info('expiration:', symbol);
    const expirations = await lib.ptfin.optionExpirations({ symbol });
    // console.info('expiration return:', expirations);
    return expirations;
  },
});
