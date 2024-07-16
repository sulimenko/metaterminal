({
  access: 'private',
  method: async ({ type, user }) => {
    console.log('invite:', type, user);
    return lib.customers.invite({ type, user });
  },
});
