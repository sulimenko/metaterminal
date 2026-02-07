/* eslint-disable camelcase */
// async ({ login, name }) => {
async ({ login }) => {
  // const wl = await db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { login, name }).order('order');
  const wl = await db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { login }).order('order');

  const list = await db.pg.select('instruments', ['symbol', 'asset_category', 'listing_exchange', 'multiplier', 'underlying_symbol'], {
    symbol: wl.map((each) => each.symbol),
  });

  const instruments = {};
  for (const inst of list) instruments[inst.symbol] = inst;
  for (const each of wl) {
    const i = instruments[each.symbol] || { symbol: each.symbol, listing_exchange: each.source, asset_category: 'STK', multiplier: 1 };
    if (!i.listing_exchange) i.listing_exchange = each.source;
    each.instrument = i;
  }
  if (wl.length > 0) return wl;

  const wlDefault = await db.pg.select('terminal_wls', ['name', 'symbol', 'symbol_id', 'source', 'order'], { login: 'default' });

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
