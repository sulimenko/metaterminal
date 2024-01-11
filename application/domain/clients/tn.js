({
  values: new Map(),
  async set({ keys }) {
    const login = config.ffin[keys.name];
    const sid = login !== undefined ? await lib.tn.getSidLogin({ keys: login }) : await await lib.tn.getSidApi({ keys });
    const client = await lib.tn.new({ sid, account: keys.name });
    return this.values.set(keys.name, client).get(keys.name);
  },
  async get({ keys }) {
    let client = this.values.get(keys.name);
    if (!client) client = await this.set({ keys });
    return client;
  },
});
