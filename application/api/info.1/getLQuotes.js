/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    const quotes = domain.marketData.tvClient.client.getQuotes();
    console.warn('lib quotes: ', quotes);
    return quotes;
  },
});
