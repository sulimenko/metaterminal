({
  access: 'private',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    const accounts = await lib.ptfin.accounts({ userId: context.session.state.user_id });
    context.session.state.accounts = Object.keys(accounts);
    return accounts;
  },
});
