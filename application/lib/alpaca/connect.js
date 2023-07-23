async () => {
  const Alpaca = npm.alpacahqAlpacaTradeApi;
  const alpaca = {};

  console.log(alpaca);
  alpaca.paper = await new Alpaca({
    keyId: config.alpaca.paper.key,
    secretKey: config.alpaca.paper.secret,
    paper: config.alpaca.paper.paper, // true, false
    feed: 'iex', // 'iex', 'sip'
  });

  alpaca.main = await new Alpaca({
    keyId: config.alpaca.main.key,
    secretKey: config.alpaca.main.secret,
    paper: config.alpaca.main.paper, // true, false
    feed: 'iex', // 'iex', 'sip'
  });
  //   console.log(alpaca);
  return alpaca;
};
