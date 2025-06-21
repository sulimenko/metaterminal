({
  access: 'private',
  method: async () => {
    return lib.ptfin.prospects({ user: context.session.state.user_id });
  },
});
