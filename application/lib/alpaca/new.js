async ({ keyId, secretKey, paper, feed }) => {
  const Alpaca = npm.alpacahqAlpacaTradeApi;
  const client = new Alpaca({
    keyId,
    secretKey,
    paper,
    feed,
  });

  return new Promise((resolve) => {
    client.trade_ws.onConnect(async () => {
      console.log('Connected');
      client.trade_ws.subscribe(['trade_updates', 'account_updates']);
      resolve(client);
    });
    client.trade_ws.onStateChange((newState) => {
      console.log(`State changed to ${newState}`);
    });
    client.trade_ws.onOrderUpdate((data) => {
      // console.log(`Order updates: ${JSON.stringify(data)}`);
      lib.alpaca.updateTrades(data);
    });
    client.trade_ws.onAccountUpdate((data) => {
      console.log(`Account updates: ${JSON.stringify(data)}`);
    });
    client.trade_ws.onDisconnect(() => {
      console.log('Disconnected');
    });
    client.trade_ws.connect();
  });
};
