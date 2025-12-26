/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    for (const [key, value] of domain.clients.terminal.values) {
      console.warn(value.session.state, value);
    }
    return 'ok';
  },
});
