({
  access: 'public',
  method: async () => {
    console.info('restartWS :', { state: context.client.session.session.state, agent: context.client?.agent });
    console.info('exist error:', [...domain.marketData.error.values]);
    // domain.marketData.error.restart();
    return 'ok';
  },
});
