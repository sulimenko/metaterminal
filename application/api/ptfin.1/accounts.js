({
  access: 'private',
  method: async () => {
    // console.log(context.session.state.user_id);
    return lib.ptfin.accounts({ userId: context.session.state.user_id });
  },
});
