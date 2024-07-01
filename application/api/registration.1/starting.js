({
  access: 'public',
  method: async (form) => {
    return lib.registration.starting({ form });
  },
});
