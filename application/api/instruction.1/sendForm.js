({
  access: 'private',
  method: async function ({ form, options = {} }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.instruction.sendForm({ form, options });
  },
});
