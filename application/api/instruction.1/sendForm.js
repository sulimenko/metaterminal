({
  access: 'private',
  method: async ({ form, options = {} }) => {
    return lib.instruction.sendForm({ form, options });
  },
});
