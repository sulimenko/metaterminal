({
  access: 'private',
  method: async function ({ id, revision }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.instruction.deleteDocument({ id, revision });
  },
});
