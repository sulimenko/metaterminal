({
  access: 'private',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    return lib.analytics.strategies({ user: context.session.state.user_id });
  },
});
