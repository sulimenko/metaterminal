({
  access: 'public',
  method: async ({ instrument, period, limit }) => {
    return lib.marketData.addChart({ instrument, userId: context.client.session?.state?.user_id, period, limit });
  },
});
