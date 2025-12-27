({
  access: 'private',
  method: async function ({ type, data = {} }) {
    lib.log.info({ params: arguments[0] });
    console.info('metaterminal :', type, data);
    return lib.instruction.send({ type, data });
  },
});
