({
  access: 'public',
  method: async () => {
    const result = await lib.risk.updateExclusions();
    return {
      status: 'ok',
      updatedAt: result.updatedAt,
      counts: result.counts,
      sources: result.sources,
    };
  },
});
