({
  values: new Map(),
  deleteClient(account) {
    this.values.delete(account);
  },
  async setClient(account) {
    let client = null;
    // if (process.env.env === 'prod') {
    // const login = config.ffin[keys.name];
    // const sid = login !== undefined ? await lib.tn.getSidLogin({ keys: login }) : await await lib.tn.getSidApi({ keys });
    const sid = await await lib.tn.getSidApi(account);
    client = await lib.tn.new({ sid, account });
    // }
    return this.values.set(account, client).get(account);
  },
  async getClient(account) {
    let client = this.values.get(account);
    if (!client) client = await this.setClient(account);
    return client;
  },
});
