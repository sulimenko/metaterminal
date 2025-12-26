({
  access: 'private',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.prospects({ user: context.session.state.user_id });
  },
});
