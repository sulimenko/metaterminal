({
  access: 'public',
  method: async () => {
    console.log('exist error:', [...domain.marketData.error.values]);
    domain.marketData.error.restart();
    return 'ok';
  },
});
