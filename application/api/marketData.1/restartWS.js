({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.info('exist error:', [...domain.marketData.error.values]);
    domain.marketData.error.restart();
    return 'ok';
  },
});
