({
  access: 'private',
  method: async function ({ name, options, update }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.analytics.strategySelection({ name, options, update, user: context.session.state.user_id });
  },
});
