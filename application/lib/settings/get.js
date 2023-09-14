/* eslint-disable camelcase */
async ({ login }) => {
  const setting = await db.pg.row('terminal_settings', { login });
  // console.log(setting);
  if (setting) return setting;

  await db.pg.insert('terminal_settings', {
    login,
    update_time: 5,
    themes: 'dark',
    chart_type: 'candle_solid',
    chart_timeframe: '900',
    chart_main: '',
    chart_sub: 'VOL',
    created_at: new Date(),
    updated_at: new Date(),
  });
  return lib.settings.get({ login });
};
