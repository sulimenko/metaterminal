({
  access: 'private',
  method: async ({ id, revision }) => {
    return lib.instruction.deleteDocument({ id, revision });
  },
});
