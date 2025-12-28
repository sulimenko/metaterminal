/* eslint-disable camelcase */
/* eslint-disable no-loop-func */
async ({ instruments }) => {
  if (instruments.length === 0) return ['empty'];
  const path = 'marketdata/quotes';
  const data = { instruments };

  const response = await lib.ptfin.sendPost({ path, data });
  for (const { symbol, quote, data } of response) {
    console.warn(symbol, quote, data);
    const exist = await domain.marketData.quotes.getQuote({ instrument: { symbol, source: 'TN' } });
    exist.addData(data);
    const { bid, bid_size, ask, ask_size } = quote;
    if (parseFloat(bid) <= 0 || parseFloat(ask) <= 0) continue;
    const book = {
      [bid.toString()]: { price: parseFloat(bid), type: 'bid', size: bid_size },
      [ask.toString()]: { price: parseFloat(ask), type: 'ask', size: ask_size },
    };
    for (const each in book) exist.addBook(book[each]);
  }

  return ['ok'];
};
