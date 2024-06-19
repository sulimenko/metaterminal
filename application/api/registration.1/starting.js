({
  access: 'public',
  method: async (formData) => {
    return lib.registration.starting({ formData });
  },
});
