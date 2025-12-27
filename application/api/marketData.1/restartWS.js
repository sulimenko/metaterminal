({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.info('exist error:', [...domain.marketData.error.values]);
    domain.marketData.error.restart();
    return 'ok';
  },
});
