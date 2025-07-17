({
  access: 'private',
  method: async ({ type, user }) => {
    console.info('invite:', type, user);
    return lib.customers.invite({ type, user });
  },
});
