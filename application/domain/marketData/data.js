({
  // default: () => {
  //   return { data: {} };
  // },
  // values: {},
  // getData({ instrument }) {
  //   if (instrument?.symbol === undefined) return null;
  //   let data = this.values[instrument.symbol];
  //   if (data === undefined) data = this.values[instrument.symbol] = this.default();
  //   return data;
  // },
  // addData({ instrument, data }) {
  //   if (instrument?.symbol === undefined) return null;
  //   const existData = this.getData({ instrument });
  //   existData.data = { ...existData.data, ...data };
  //   return existData;
  // },
});
