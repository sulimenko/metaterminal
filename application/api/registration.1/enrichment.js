({
  access: 'private',
  method: async (form) => {
    return lib.registration.enrichment({ form });
  },
});
