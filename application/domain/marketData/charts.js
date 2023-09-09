({
  default: ({ instrument, period }) => {
    return { symbol: instrument.symbol, source: instrument.source, period, data: {}, signers: new Set(), full: new Set() };
  },
  values: new Map(),
  getChart({ instrument, period }) {
    let data = this.values.get(instrument.symbol);
    if (data === undefined) {
      data = { [period]: this.default({ instrument, period }) };
      data = this.values.set(instrument.symbol, data).get(instrument.symbol);
    }
    if (data[period] === undefined) {
      data[period] = this.default({ instrument, period });
      data = this.values.set(instrument.symbol, data).get(instrument.symbol);
    }
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
