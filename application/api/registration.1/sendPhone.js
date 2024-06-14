({
  access: 'public',
  method: async (formData) => {
    return lib.registration.sendPhone({ formData });
  },
});
