({
  access: 'private',
  method: async function ({ type, user }) {
    lib.log.info({ params: arguments[0] });
    console.info('invite:', type, user);
    return lib.customers.invite({ type, user });
  },
});
