({
  access: 'public',
  method: async ({ id, taxNumber }) => {
    return lib.registration.enrichment({ form: { id, taxNumber } });
  },
});
