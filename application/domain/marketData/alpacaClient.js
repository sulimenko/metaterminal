({
  values: new Map(),
  set({ key }) {
    return this.values.set(
      key,
      lib.alpaca.new({
        keyId: config.alpaca[key].key,
        secretKey: config.alpaca[key].secret,
        paper: config.alpaca[key].paper, // true, false
        feed: 'iex', // 'iex', 'sip'});
      }),
    );
  },
  get({ key }) {
    return this.values.get(key);
  },
});
