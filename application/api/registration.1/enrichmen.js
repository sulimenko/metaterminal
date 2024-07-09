({
  access: 'public',
  method: async ({ form, options }) => {
    const data = { id: form.id };
    if (options.type === 'phone') data.phone = form.phone;
    if (options.type === 'taxNumber') data.taxNumber = form.taxNumber;

    return lib.instruction.sendForm({ form: data, options });
  },
});
