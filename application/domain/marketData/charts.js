({
  default: ({ instrument, period }) => {
    return {
      symbol: instrument.symbol,
      source: instrument.source,
      period,
      data: { full: [], last: {} },
      signers: new Set(),
    };
  },
  values: new Map(),
  // setChart({ data }) {
  //   this.values.set(data.symbol, { [data.period.toString()]: data });
  // },
  getSymbol({ instrument }) {
    let data = this.values.get(instrument.symbol);
    if (data === undefined) data = this.values.set(instrument.symbol, {}).get(instrument.symbol);
    return data;
  },
  getChart({ instrument, period, limit }) {
    let chart = this.getSymbol({ instrument });
    if (chart[period] === undefined) {
      chart[period] = this.default({ instrument, period });
      if (instrument.asset_category === 'OPT') {
        lib.marketData.optionChart({ instrument, period, limit });
      } else {
        domain.marketData.tvClient.client.addChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit });
      }
      this.values.set(instrument.symbol, chart);
      chart = this.getSymbol({ instrument });
    }
    return chart[period];
  },
  deleteChart({ instrument, period }) {
    const chart = this.getSymbol({ instrument });
    if (domain.marketData.tvClient.client !== null) {
      domain.marketData.tvClient.client.deleteChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period });
    }
    if (Object.keys(chart).length < 2) return void this.values.delete(instrument.symbol);
    return void delete chart[period];
  },
  getChartSigner({ userId }) {
    if (userId) {
      for (const [key, value] of this.values.entries()) {
        for (const period of Object.keys(value)) {
          if (value[period].signers.has(userId)) {
            return this.values.get(key)[period];
          }
        }
      }
    }
    return null;
  },
});
