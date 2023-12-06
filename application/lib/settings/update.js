/* eslint-disable camelcase */
async ({ login, updates = {} }) => {
  // console.log(login, updates);
  let exist = {};
  for (const [key, value] of Object.entries(updates)) {
    exist = await lib.settings.get({ login, type: key });
    for (const [name, item] of Object.entries(value)) {
      exist[name] = item;
    }
    await db.pg.update('terminal_settings', { [key]: JSON.stringify(exist) }, { login });
  }
  return 'updated';
};
