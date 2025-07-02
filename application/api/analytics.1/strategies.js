({
  access: 'private',
  method: async () => {
    return lib.analytics.strategies({ user: context.session.state.user_id });
  },
});
