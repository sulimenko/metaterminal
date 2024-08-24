({
  access: 'private',
  method: async ({ type }) => {
    context.session.state.type = type;
    return db.pg.update('terminal_users', { type }, { login: context.session.state.login });
  },
});
