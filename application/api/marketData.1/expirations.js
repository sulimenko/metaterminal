({
  access: 'private',
  method: async ({ symbol }) => {
    return lib.ts.optionExpirations({ symbol });
    // console.info('expiration return:', expirations);
    // return expirations;
  },
});
