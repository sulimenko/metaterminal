({
  values: new Map(),

  method({ key, val }) {
    console.info({ key, val });
    if (val) {
      return this.values.set(key, val);
    }
    const res = this.values.get(key);
    console.info({ return: { res } });
    return res;
  },
});
