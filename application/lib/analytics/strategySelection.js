async ({ name, options, update, user }) => {
  const path = 'analytics/strategy_selection';
  const data = { name, options, update, user };

  return lib.ptfin.sendPost({ path, data });
};
