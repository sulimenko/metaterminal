/* eslint-disable no-loop-func */
async ({ instruments }) => {
  if (instruments.length === 0) return ['empty'];
  const path = 'marketdata/quotes';
  const data = { instruments };

  const response = await lib.ptfin.sendPost({ path, data });

  // console.warn(response);

  let quoteSymbol = null;
  let dataSymbol = null;
  for (const instrument of response) {
    quoteSymbol = domain.marketData.quotes.getQuote({ instrument });
    Object.keys(instrument.quote).forEach((key) => (quoteSymbol.data[key] = instrument.quote[key]));
    domain.marketData.quotes.values.set(instrument.symbol, quoteSymbol);

    dataSymbol = domain.marketData.data.getData({ symbol: instrument.symbol });
    Object.keys(instrument.data).forEach((key) => (dataSymbol.data[key] = instrument.data[key]));
    domain.marketData.data.values.set(instrument.symbol, dataSymbol);
  }

  return ['ok'];
};
