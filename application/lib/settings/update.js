/* eslint-disable camelcase */
async ({ login, updates = {} }) => {
  return db.pg.update('terminal_settings', updates, { login });
};
