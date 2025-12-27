({
  access: 'private',
  method: async function ({ id, revision }) {
    lib.log.info({ params: arguments[0] });
    return lib.instruction.deleteDocument({ id, revision });
  },
});
