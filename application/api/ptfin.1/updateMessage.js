({
  access: 'public',
  method: async function (data) {
    lib.log.info({ params: arguments[0] });
    // console.warn(data);
    if (data.type === 'order') return lib.ptfin.updateOrder({ update: data });
    if (data.type === 'strategy') return lib.analytics.newSelection({ update: data });
    return ['OK'];
  },
});
