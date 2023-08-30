({
  default: ({ symbol, period }) => {
    return { symbol, period, data: {}, signers: new Set(), full: new Set() };
  },
  values: new Map(),
  getChart({ symbol, period }) {
    let data = this.values.get(symbol);
    if (data === undefined) data = this.values.set(symbol, { [period]: this.default({ symbol, period }) }).get(symbol);
    if (data[period] === undefined) data = this.values.set(symbol, { [period]: this.default({ symbol, period }) }).get(symbol);
    return data[period];
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
  setChart({ data }) {
    this.values.set(data.symbol, { [data.period.toString()]: data });
  },
});
