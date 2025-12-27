({
  access: 'private',
  method: async function ({ type }) {
    lib.log.info({ params: arguments[0] });
    context.session.state.type = type;
    return db.pg.update('terminal_users', { type }, { login: context.session.state.login });
  },
});
