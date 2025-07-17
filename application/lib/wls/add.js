/* eslint-disable camelcase */
async ({ login, name, instrument }) => {
  const wl = await db.pg.select('terminal_wls', ['name', 'symbol', 'source', 'order'], { login, name }).order('order');
  // console.info('name :', name, 'instrument :', instrument);
  // const find = wl.find((each) => each.symbol === instrument.symbol && each.source === instrument.source);
  const find = wl.find((each) => each.symbol === instrument.symbol);
  if (find !== undefined) return false;
  // console.info(find);
  await db.pg.insert('terminal_wls', {
    login,
    name,
    symbol: instrument.symbol,
    // symbol_id: instrument.symbol_id,
    source: instrument.prefix !== undefined ? instrument.prefix : instrument.exchange,
    order: wl.length,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return true;
};
