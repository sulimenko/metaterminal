/* eslint-disable camelcase */
async ({ login, name, instrument }) => {
  const wl = await db.pg.select('terminal_wls', ['id', 'name', 'symbol', 'source', 'order'], { login, name }).order('order');
  // console.log(wl);
  const find = wl.find((each) => each.symbol === instrument.symbol && each.source === instrument.exchange);

  if (find === undefined) return false;
  await db.pg.delete('terminal_wls', { id: find.id });
  return true;
};
