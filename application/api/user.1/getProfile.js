({
  access: 'private',
  method: async function ({ id }) {
    lib.log.info({ params: arguments[0] });
    return lib.customers.profile({ id });
  },
});
