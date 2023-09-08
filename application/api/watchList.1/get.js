/* eslint-disable camelcase */
({
  access: 'private',
  method: async () => {
    return db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { user_id: context.session.state.user_id }).order('order');
  },
});
