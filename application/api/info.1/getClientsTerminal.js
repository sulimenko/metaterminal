/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    for (const [key, value] of domain.clients.terminal.values) {
      console.warn(value.session.state, value);
    }
    return 'ok';
  },
});
