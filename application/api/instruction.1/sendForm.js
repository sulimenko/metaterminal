({
  access: 'private',
  method: async function ({ form, options = {} }) {
    lib.log.info({ params: arguments[0] });
    return lib.instruction.sendForm({ form, options });
  },
});
