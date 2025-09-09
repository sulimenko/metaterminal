/* eslint-disable no-loop-func */
async ({ instruments }) => {
  if (instruments.length === 0) return ['empty'];
  const path = 'marketdata/quotes';
  const data = { instruments };

  const response = await lib.ptfin.sendPost({ path, data });
  for (const { symbol, quote, data } of response) {
    domain.marketData.quotes.addQuote({ instrument: { symbol }, quote });
    domain.marketData.data.addData({ instrument: { symbol }, data });
  }

  return ['ok'];
};
