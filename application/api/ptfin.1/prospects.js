({
  access: 'private',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.prospects({ user: context.session.state.user_id });
  },
});
