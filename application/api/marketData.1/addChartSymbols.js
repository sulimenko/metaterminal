({
  access: 'public',
  method: async function ({ instruments, period, limit }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.marketData.addChart({ instruments, userId: context.client.session?.state?.user_id, period, limit });
  },
});
