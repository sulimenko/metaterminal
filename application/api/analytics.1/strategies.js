({
  access: 'private',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    return lib.analytics.strategies({ user: context.session.state.user_id });
  },
});
