({
  client: null,
  async connect() {
    let status = '';
    if (this.client === null) {
      const { Client } = npm.marketDataTradingviewWs;
      this.client = new Client();

      status = await this.client.connect({
        url: config.marketdata.socket.url,
        options: JSON.parse(config.marketdata.socket.options),
        login: config.marketdata.socket.login,
        pass: config.marketdata.socket.pass,
        token: config.marketdata.socket.token,
        result: lib.marketData.callback,
      });
    }
    return status;
  },
  close() {
    this.client.close();
    this.client = null;
    return;
  },
});
