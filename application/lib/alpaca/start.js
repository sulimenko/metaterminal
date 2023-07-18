async () => {
  if (application.worker.id === 'W1') {
    console.debug('Connect to alpaca');
  }

  lib.Alpaca = npm.alpacahqAlpacaTradeApi;

  lib.alpaca.paper = new lib.Alpaca({
    keyId: config.alpaca.paper.key,
    secretKey: config.alpaca.paper.secret,
    paper: config.alpaca.paper.paper, // true, false
    feed: 'iex', // 'iex', 'sip'
  });

  lib.alpaca.main = new lib.Alpaca({
    keyId: config.alpaca.main.key,
    secretKey: config.alpaca.main.secret,
    paper: config.alpaca.main.paper, // true, false
    feed: 'iex', // 'iex', 'sip'
  });

  // if (application.worker.id === 'W1') {
  //   // console.log('alpaca', lib.alpaca);
  //   lib.alpaca.main.data_stream_v2.onConnect(function () {
  //     console.debug('onConnect', 'Connected');
  //     // socket.subscribeForQuotes();
  //     // alpaca.data_stream_v2.subscribeForTrades(['AAPL']);
  //     // socket.subscribeForBars(['SPY', 'MRNA']);
  //     // socket.subscribeForStatuses(['*']);
  //   });
  // }
};
