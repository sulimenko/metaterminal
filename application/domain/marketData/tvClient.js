({
  client: null,
  async connect() {
    let status = '';
    if (this.client === null) {
      const { Client } = npm.marketDataTradingviewWs;
      this.client = new Client();

      status = await this.client.connect({
        url: config.marketdata.tradingView.url,
        options: JSON.parse(config.marketdata.tradingView.options),
        login: config.marketdata.tradingView.login,
        pass: config.marketdata.tradingView.pass,
        token: config.marketdata.tradingView.token,
        result: lib.marketData.callback,
      });
    }
    return status;
  },
});
