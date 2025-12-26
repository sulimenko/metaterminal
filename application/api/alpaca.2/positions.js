({
  access: 'public',
  method: async function ({ keys }) {
    lib.log.info({ args: Array.from(arguments) });
    const alpaca = lib.utils.alpacaConnect(keys);
    return alpaca.getPositions();
  },
});
