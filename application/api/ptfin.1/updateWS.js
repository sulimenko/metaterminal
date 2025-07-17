({
  access: 'private',
  method: async () => {
    console.info('updateWS');
    await domain.client.tn.restartClients();
    return 'reconnect';
  },
});
