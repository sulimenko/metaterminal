/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    for (const [key, value] of domain.clients.terminal.values) {
      console.warn(value.session.state, value);
    }
    return 'ok';
  },
});
