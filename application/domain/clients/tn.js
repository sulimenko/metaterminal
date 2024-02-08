({
  values: new Map(),
  async setClient({ keys }) {
    let client = [];
    if (process.env.env === 'prod') {
      const login = config.ffin[keys.name];
      const sid = login !== undefined ? await lib.tn.getSidLogin({ keys: login }) : await await lib.tn.getSidApi({ keys });
      client = await lib.tn.new({ sid, account: keys.name });
      console.warn('readyState: ', client.readyState);
    }
    return this.values.set(keys.name, client).get(keys.name);
  },
  async getClient({ keys }) {
    let client = this.values.get(keys.name);
    if (!client) client = await this.setClient({ keys });
    return client;
  },
});
