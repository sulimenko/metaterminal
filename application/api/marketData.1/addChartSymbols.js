({
  access: 'public',
  method: async function ({ instruments, period, limit }) {
    lib.log.info({ params: arguments[0] });
    return lib.marketData.addChart({ instruments, userId: context.client.session?.state?.user_id, period, limit });
  },
});
