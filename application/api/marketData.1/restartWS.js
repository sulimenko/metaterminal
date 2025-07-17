({
  access: 'public',
  method: async () => {
    console.info('exist error:', [...domain.marketData.error.values]);
    domain.marketData.error.restart();
    return 'ok';
  },
});
