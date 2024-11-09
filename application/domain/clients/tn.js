({
  values: new Map(),
  deleteClient(account) {
    console.log('tn deleteClient', account);
    this.values.delete(account);
  },
  async setClient(account, update = false) {
    let client = null;
    if (process.env.env === 'prod') {
      const sid = await lib.tn.getSidApi(account, update);
      client = await lib.tn.new({ sid, account });
    }
    return this.values.set(account, client).get(account);
  },
  async getClient(account, update = false) {
    if (update) this.deleteClient(account);
    let client = this.values.get(account);
    if (!client) client = await this.setClient(account, update);
    return client;
  },
});
