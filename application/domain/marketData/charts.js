({
  default: ({ instrument, period }) => {
    return {
      symbol: instrument.symbol,
      source: instrument.source,
      period,
      data: { full: [], last: {} },
      signers: new Set(),
      // full: new Set(),
    };
  },
  values: new Map(),
  setChart({ data }) {
    this.values.set(data.symbol, { [data.period.toString()]: data });
  },
  getSymbol({ instrument }) {
    let data = this.values.get(instrument.symbol);
    if (data === undefined) data = this.values.set(instrument.symbol, {}).get(instrument.symbol);
    return data;
  },
  getChart({ instrument, period }) {
    // console.log('getChart: ', instrument, period);
    let chart = this.getSymbol({ instrument });
    // console.log('getChart exist: ', chart);
    if (chart[period] === undefined) {
      chart[period] = this.default({ instrument, period });
      // console.log('getChart default: ', chart);
      this.values.set(instrument.symbol, chart);
      chart = this.getSymbol({ instrument });
      // console.log('getChart ALL: ', chart);
    }
    // console.log('getChart return: ', period, chart[period]);
    return chart[period];
  },
  getChartSigner({ userId }) {
    for (const [key, value] of this.values.entries()) {
      for (const period of Object.keys(value)) {
        if (value[period].signers.has(userId)) {
          return this.values.get(key)[period];
        }
      }
    }
    return null;
  },
});
