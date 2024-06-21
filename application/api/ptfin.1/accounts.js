({
  access: 'private',
  method: async () => {
    const accounts = await lib.ptfin.accounts({ userId: context.session.state.user_id });
    context.session.state.accounts = Object.keys(accounts);
    return accounts;
  },
});
