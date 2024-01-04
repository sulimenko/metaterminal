/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    for (const [key, value] of domain.marketData.clients.values) {
      console.warn(value.session.state, value);
    }
    return 'ok';
  },
});
