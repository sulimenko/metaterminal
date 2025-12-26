({
  access: 'private',
  method: async function ({ type, data = {} }) {
    lib.log.info({ args: Array.from(arguments) });
    console.info('metaterminal :', type, data);
    return lib.instruction.send({ type, data });
  },
});
