({
  access: 'private',
  method: async ({ symbol, type = 'all' }) => {
    // return lib.marketData.getQuote({ symbol });
    const quote = await domain.marketData.quotes.getQuote({ instrument: { symbol } });
    if (type === 'all') return { data: quote.value, book: quote.book };
    return quote[type];
  },
});
