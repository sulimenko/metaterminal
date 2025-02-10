({
  values: new Map(),
  // restartClients() {
  //   setInterval(() => {
  //     for (const account of this.values.keys()) {
  //       if (this.values.get(account).ws.readyState !== 1) {
  //         console.log('restartClients');
  //         this.setClient(account);
  //       }
  //     }
  //   }, 20 * 1000);
  // },
  // deleteClient(account) {
  // console.log('tn deleteClient', account);
  // this.values.delete(account);
  // },
  async setClient(account, update = false) {
    const sid = await lib.tn.getSidApi(account, update);
    let client = await this.values.get(account);
    if (client === undefined) client = await lib.tn.new({ sid, account });
    if (sid === undefined || sid === null) {
      console.error(account, 'SID empty!!! sid =', sid);
    } else {
      client.access.sid = sid;
      client.connect();
    }
    return this.values.set(account, client).get(account);
  },
  async getClient(account, update = false) {
    let client = this.values.get(account);
    if (!client || update) client = await this.setClient(account, true);
    return client;
  },
});
