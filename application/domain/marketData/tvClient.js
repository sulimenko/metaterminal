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
        result: lib.marketData.callback,
        sessionid: config.marketdata.socket.sessionid,
        sessionidsign: config.marketdata.socket.sessionidsign,
        tvecuid: config.marketdata.socket.tvecuid,
        imageurl: config.marketdata.socket.imageurl,
      });
    }
    return status;
  },
  async close() {
    this.client.close();
    this.client = null;
    return;
  },
});
