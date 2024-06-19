({
  access: 'public',
  method: async (form) => {
    return lib.registration.form({ form });
  },
});
