({
  values: {},
  //   async restartClients() {
  //     for (const [account, client] of this.values.entries) {
  //       const status = client.status();
  //       if (['CLOSED', 'UNKNOWN'].includes(status)) {
  //         console.error('Client ws ' + account + ' is ' + status + ', restart!!!');
  //         client.reconnect = 0;
  //         client.restart();
  //       }
  //     }
  //     return [];
  //   },
  async deleteClient(name) {
    console.warn('DELETE client ws: ' + name);
    const client = this.values[name];
    if (client === undefined) return true;
    client.close();
    this.values[name] = null;
    return delete this.values[name];
  },
  async setClient(name) {
    console.warn('Set client ws: ' + name);
    this.values[name] = 'starting';
    this.values[name] = await lib.ts.connectWS();
    return this.values[name];
  },
  async getClient(name = 'main', update = false, attempt = 0) {
    if (update) await this.deleteClient(name);

    let client = this.values[name];
    if (client === 'starting') {
      if (attempt < 20) {
        await lib.utils.wait(100);
        this.getClient(name, update, ++attempt);
      } else {
        console.error('Can not start client ws: ' + name);
        return null;
      }
    }

    if (client === undefined) client = await this.setClient(name);
    return client;
  },
});
