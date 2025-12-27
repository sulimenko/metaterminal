({
  access: 'private',
  method: async function ({ name, options, update }) {
    lib.log.info({ params: arguments[0] });
    return lib.analytics.strategySelection({ name, options, update, user: context.session.state.user_id });
  },
});
