({
  access: 'public',
  method: async ({ keys }) => {
    const alpaca = lib.utils.alpacaConnect(keys);
    return alpaca.getAccount();
    // return alpaca.getAccountConfigurations();
  },
});
