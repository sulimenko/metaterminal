({
  default: () => {
    return { data: {} };
  },
  values: new Map(),
  getData({ symbol }) {
    let data = this.values.get(symbol);
    if (data === undefined) data = this.values.set(symbol, this.default()).get(symbol);
    return data;
  },
  setData({ key, data }) {
    return this.values.set(key, data);
  },
});
