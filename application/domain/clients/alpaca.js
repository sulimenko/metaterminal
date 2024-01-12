({
  values: new Map(),
  async setClient({ keys }) {
    let client = [];
    if (process.env.env === 'prod') {
      client = await lib.alpaca.new({
        keyId: keys.pkey,
        secretKey: keys.secret,
        paper: keys.live !== undefined ? !keys.live : true, // true, false
        feed: 'iex', // 'iex', 'sip'});
      });
    }
    return this.values.set(keys.name, client).get(keys.name);
  },
  async getClient({ keys }) {
    let client = this.values.get(keys.name);
    if (!client) client = await this.setClient({ keys });
    return client;
  },
});
