({
  access: 'private',
  method: async () => {
    console.log('updateWS');
    await lib.tn.connectWS(true);
    return 'reconnect';
  },
});
