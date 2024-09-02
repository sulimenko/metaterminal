({
  access: 'public',
  method: async ({ instruments, period, limit }) => {
    return lib.marketData.addChart({ instruments, userId: context.client.session?.state?.user_id, period, limit });
  },
});
