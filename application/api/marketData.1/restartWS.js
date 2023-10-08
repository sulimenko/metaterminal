({
  access: 'public',
  method: async () => {
    domain.marketData.error.restart();
    return 'ok';
  },
});
