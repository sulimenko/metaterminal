({
  values: new Map(),
  set({ key }) {
    const Alpaca = npm.alpacahqAlpacaTradeApi;
    const client = new Alpaca({
      keyId: config.alpaca[key].key,
      secretKey: config.alpaca[key].secret,
      paper: config.alpaca[key].paper, // true, false
      feed: 'iex', // 'iex', 'sip'});
    });
    return this.values.set(key, client);
  },
  get({ key }) {
    return this.values.get(key);
  },
});
