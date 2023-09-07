/* eslint-disable camelcase */
({
  access: 'private',
  method: async () => {
    return db.pg.select('terminal_wls', { user_id: context.session.state.user_id });
  },
});
