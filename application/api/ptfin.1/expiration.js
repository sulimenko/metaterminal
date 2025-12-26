({
  access: 'private',
  method: async function ({ symbol }) {
    lib.log.info({ args: Array.from(arguments) });
    // console.info('expiration:', symbol);
    const expirations = await lib.ptfin.optionExpirations({ symbol });
    // console.info('expiration return:', expirations);
    return expirations;
  },
});
