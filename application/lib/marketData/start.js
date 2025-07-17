async () => {
  if (application.worker.id === 'W2') {
    console.info('start lib.marketData');
    setInterval(() => lib.marketData.requestQuote({ instruments: Array.from(domain.marketData.quotes.requestList) }), 3 * 60 * 1000);
  }
};
