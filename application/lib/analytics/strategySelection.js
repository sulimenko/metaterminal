async ({ name, options, update, user }) => {
  const method = 'analytics/strategy_selection';
  const data = { name, options, update, user };

  return lib.ptfin.sendPost({ method, data });
};
