({
  access: 'private',
  method: async () => {
    console.log('updateWS');
    await domain.client.tn.restartClients();
    return 'reconnect';
  },
});
