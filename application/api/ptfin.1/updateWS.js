({
  access: 'private',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.info('updateWS');
    await domain.client.tn.restartClients();
    return 'reconnect';
  },
});
