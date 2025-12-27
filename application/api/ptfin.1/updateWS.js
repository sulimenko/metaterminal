({
  access: 'private',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.info('updateWS');
    await domain.client.tn.restartClients();
    return 'reconnect';
  },
});
