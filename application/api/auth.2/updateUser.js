({
  access: 'private',
  method: async function ({ type }) {
    lib.log.info({ args: Array.from(arguments) });
    context.session.state.type = type;
    return db.pg.update('terminal_users', { type }, { login: context.session.state.login });
  },
});
