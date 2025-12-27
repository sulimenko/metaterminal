/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    for (const [key, value] of domain.marketData.charts.values.entries()) {
      console.warn(key, value);
      // for (const key of Object.keys(value)) {
      //   console.warn(key, value[key].data);
      // }
    }
    return 'OK';
  },
});
