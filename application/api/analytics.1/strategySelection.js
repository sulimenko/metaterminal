({
  access: 'private',
  method: async ({ name, options, update }) => {
    return lib.analytics.strategySelection({ name, options, update, user: context.session.state.user_id });
  },
});
