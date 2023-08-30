({
  access: 'public',
  method: async () => {
    const token = await lib.tradingView.getToken();
    return token;
  },
});
