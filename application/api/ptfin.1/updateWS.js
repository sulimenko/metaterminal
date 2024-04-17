({
  access: 'private',
  method: async () => {
    console.log('updateWS');
    lib.tn.connectWS(true);
    return 'send';
  },
});
