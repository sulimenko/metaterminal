({
  access: 'private',
  method: async ({ instrument, expiration, stop = false }) => {
    return lib.ts.optionChain({ instrument, expiration, stop, userId: context.session.state.user_id });
  },
});
