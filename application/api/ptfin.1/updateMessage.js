({
  access: 'public',
  method: async (data) => {
    // console.warn(data);
    if (data.type === 'order') {
      lib.ptfin.updateOrder({ update: data });
    }
    return 'OK';
  },
});
