({
  access: 'private',
  method: async function ({ type, user }) {
    lib.log.info({ args: Array.from(arguments) });
    console.info('invite:', type, user);
    return lib.customers.invite({ type, user });
  },
});
