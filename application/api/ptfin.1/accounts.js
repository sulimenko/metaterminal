({
  access: 'private',
  method: async () => {
    // console.log(context.session.state.user_id);
    const accounts = await lib.ptfin.accounts({ userId: context.session.state.user_id });
    // console.warn(typeof accounts, Object.keys(accounts));
    context.session.state.accounts = Object.keys(accounts);
    return accounts;
  },
});
