({
  access: 'private',
  method: async ({ type, data = {} }) => {
    console.log('metaterminal :', type, data);
    return lib.instruction.send({ type, data });
  },
});
