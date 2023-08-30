({
  default: () => {
    return { data: {}, signers: new Set() };
  },
  values: new Map(),
  getQuote({ symbol }) {
    let data = this.values.get(symbol);
    if (data === undefined) data = this.values.set(symbol, this.default()).get(symbol);
    return data;
  },
  getQuoteSigner({ userId }) {
    for (const [key, value] of this.values.entries()) {
      if (value.signers.has(userId)) {
        return { symbol: key, value };
      }
    }
    return null;
  },
});
