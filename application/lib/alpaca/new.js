({ keyId, secretKey, paper, feed }) => {
  const Alpaca = npm.alpacahqAlpacaTradeApi;
  return new Alpaca({
    keyId,
    secretKey,
    paper,
    feed,
  });
};
