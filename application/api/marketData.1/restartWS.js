({
  access: 'public',
  method: async () => {
    const state = context.client?.session?.state ?? null;
    console.info('restartWS :', { state, agent: context.client?.agent });
    console.info('exist error:', [...domain.marketData.error.values]);
    // domain.marketData.error.restart();
    return 'ok';
  },
});
