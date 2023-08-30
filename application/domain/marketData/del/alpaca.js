({
  stream: new Map(),
  setStream({ symbol, account }) {
    if (!this.list.has(symbol)) return this.list.set(symbol, [account]);
    return this.list.set(symbol, this.list.has(symbol).push(account));
  },
  getStream({ symbol = '*' }) {
    console.log(symbol);
    if (symbol === '*') return this.list.get();
    return this.list.get(symbol);
  },
});
