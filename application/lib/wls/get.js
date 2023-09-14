/* eslint-disable camelcase */
async ({ login }) => {
  const wl = await db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { login }).order('order');
  console.log(wl);
  if (wl.length > 0) return wl;

  const wlDefault = await db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { login: 'default' });

  for (const instrument of wlDefault) {
    await db.pg.insert('terminal_wls', {
      login,
      name: instrument.name,
      symbol: instrument.symbol,
      symbol_id: instrument.symbol_id,
      source: instrument.source,
      order: instrument.order,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return lib.wls.get({ login });
};
