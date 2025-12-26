({
  access: 'public',
  method: async function (data) {
    lib.log.info({ args: Array.from(arguments) });
    // console.warn(data);
    if (data.type === 'order') return lib.ptfin.updateOrder({ update: data });
    if (data.type === 'strategy') return lib.analytics.newSelection({ update: data });
    return ['OK'];
  },
});
