/* eslint-disable camelcase */
async ({ login, type }) => {
  const setting = await db.pg.row('terminal_settings', [type], { login });
  // console.info(setting);
  if (setting) return setting[type];

  await db.pg.insert('terminal_settings', {
    login,
    // update_time: 5,
    // themes: 'dark',
    // chart_type: 'candle_solid',
    // chart_timeframe: '3600',
    // chart_main: '',
    // chart_sub: 'VOL',
    main: JSON.stringify({ theme: 'dark', symbol: null, refresh: '10', account: null, confirmation: true }),
    chart: JSON.stringify({ sub: 'VOL', main: [], type: 'candle_solid', timeframe: 3600 }),
    created_at: new Date(),
    updated_at: new Date(),
  });
  return lib.settings.get({ login, type });
};
