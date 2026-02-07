async () => {
  console.debug(`lib.marketData.start begin ${application.worker.id}`);
  lib.marketData.streamStart();
  if (application.worker.id === 'W1') {
    console.info('start lib.marketData');
    setInterval(() => {
      // console.info('start lib.marketData:', Object.keys(domain.marketData.quotes.values));
      const list = [];
      for (const symbol of Object.keys(domain.marketData.quotes.values)) {
        if (domain.marketData.quotes.values[symbol].source === 'TN') list.push({ symbol });
      }
      if (list.length > 0) lib.marketData.requestQuote({ instruments: list });
    }, 3 * 60 * 1000);
  }
  console.debug(`lib.marketData.start end ${application.worker.id}`);
};
