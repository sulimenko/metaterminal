({
  access: 'public',
  method: async () => {
    console.warn('getClientsTn: ', domain.clients.tn.values);
    return 'ok';
  },
});
