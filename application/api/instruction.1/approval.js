({
  access: 'private',
  method: async ({ type, data = {} }) => {
    console.info('metaterminal :', type, data);
    return lib.instruction.send({ type, data });
  },
});
