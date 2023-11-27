({
  values: new Set(),
  getSize() {
    return this.values.size;
  },
  addError({ error }) {
    const size = this.getSize();
    return this.values.add({ [size]: error });
  },
  async restart() {
    this.values.clear();
    domain.marketData.tvClient.close();
    setTimeout(async () => {
      domain.marketData.tvClient.client = null;
      const status = await domain.marketData.tvClient.connect();
      console.log('restart: ', status);
      if (status === 'open') {
        const quoteArray = [];
        for (const each of domain.marketData.quotes.values.values()) {
          if (each.data.source !== undefined && each.data.symbol !== undefined) quoteArray.push(each.data.source + ':' + each.data.symbol);
        }
        console.warn('quoteArray: ', quoteArray);
        domain.marketData.tvClient.client.addQuoteSymbols({ symbols: quoteArray });

        for (const each of domain.marketData.charts.values.values()) {
          for (const period in each) {
            if (each[period].signers.size > 0) {
              console.log('charts', each);
              domain.marketData.tvClient.client.addChartSymbol({
                symbol: each[period].source + ':' + each[period].symbol,
                period: each[period].period,
                limit: each[period].limit,
              });
            }
          }
        }
      }
    }, 500);
    return;
  },
});
