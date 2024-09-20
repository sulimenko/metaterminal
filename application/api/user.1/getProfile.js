({
  access: 'private',
  method: async ({ id }) => {
    return lib.customers.profile({ id });
  },
});
