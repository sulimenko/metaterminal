({
  access: 'public',
  method: async function ({ keys }) {
    lib.log.info({ params: arguments[0] });
    const alpaca = lib.utils.alpacaConnect(keys);
    return alpaca.getPositions();
  },
});
