({
  access: 'public',
  method: async (message) => {
    console.warn(message);
    if (message.type === 'order') {
      lib.ptfin.updateOrder({ update: message });
    }
    return 'OK';
  },
});
