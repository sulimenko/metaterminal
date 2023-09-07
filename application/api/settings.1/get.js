/* eslint-disable camelcase */
({
  access: 'private',
  method: async () => {
    return db.pg.row('terminal_settings', { user_id: context.session.state.user_id });
  },
});
