/* eslint-disable camelcase */
async ({ login, name, instrument }) => {
  const wl = await db.pg.select('terminal_wls', ['id', 'name', 'symbol', 'source', 'order'], { login, name }).order('order');
  // console.log(wl);
  const find = wl.find((each) => each.symbol === instrument.symbol && each.source === instrument.source);

  if (find === undefined) return false;
  await db.pg.delete('terminal_wls', { id: find.id });

  let i = 1;
  for (const each of wl) {
    if (each.order !== i) {
      each.order = i;
      await db.pg.update('terminal_wls', { order: each.order }, { id: each.id });
    }
    i++;
  }

  return true;
};
