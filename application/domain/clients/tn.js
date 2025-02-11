({
  values: new Map(),
  restartClients() {
    for (const [account, client] of this.values.entries) {
      const status = client.status();
      if (['CLOSED', 'UNKNOWN'].includes(status)) {
        console.error('Client ws ' + account + ' is ' + status + ', restart!!!');
        client.reconnect = 0;
        client.restart();
      }
    }
  },
  async setClient(account, update = false) {
    const sid = await lib.tn.getSidApi(account, update);
    let client = this.values.get(account);
    if (client === undefined) client = await lib.tn.new({ sid, account });
    if (sid === undefined || sid === null) {
      console.error(account, 'SID empty!!! sid =', sid);
    } else {
      client.connect(sid);
    }
    return this.values.set(account, client).get(account);
  },
  async getClient(account, update = false) {
    let client = this.values.get(account);
    if (!client || update) client = await this.setClient(account, true);
    return client;
  },
});
