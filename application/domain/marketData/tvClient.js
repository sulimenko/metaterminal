({
  client: null,
  async connect() {
    let status = '';
    if (this.client === null) {
      const { Client } = npm.marketDataTradingviewWs;
      this.client = new Client();

      status = await this.client.connect({
        url: config.tradingview.main.url,
        options: JSON.parse(config.tradingview.main.options),
        login: config.tradingview.main.login,
        pass: config.tradingview.main.pass,
        result: lib.marketData.callback,
      });
    }
    return status;
  },
});
