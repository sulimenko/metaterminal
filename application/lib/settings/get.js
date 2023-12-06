/* eslint-disable camelcase */
async ({ login, type }) => {
  const setting = await db.pg.row('terminal_settings', [type], { login });
  // console.log(setting);
  if (setting) return setting[type];

  await db.pg.insert('terminal_settings', {
    login,
    update_time: 5,
    themes: 'dark',
    chart_type: 'candle_solid',
    chart_timeframe: '900',
    chart_main: '',
    chart_sub: 'VOL',
    main: JSON.stringify({ theme: 'dark', refresh: 5 }),
    chart: JSON.stringify({ sub: 'VOL', main: '', type: 'candle_solid', timeframe: 900 }),
    created_at: new Date(),
    updated_at: new Date(),
  });
  return lib.settings.get({ login });
};
