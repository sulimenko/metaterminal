async () => {
  if (application.worker.id !== 'W5') return;

  for (const type of ['paper', 'main']) {
    lib.alpaca.client.set({ key: type });
  }
  // await application.invoke({
  // method: 'lib.alpaca.connect',
  // args: {},
  // exclusive: false,
  // });

  console.debug('Connect to alpaca');
  // const client = lib.alpaca.client.get({ key: 'main' });
  // console.log(client);

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
