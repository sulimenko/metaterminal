async ({ instrument, expiration, stop, userId }) => {
  const chain = await domain.marketData.chains.getChainData({ instrument, expiration });
  // console.warn('Option chain', chain);
  if (stop) {
    console.log('Stopping option chain stream for', instrument.symbol, expiration);
    await chain.stop(userId);
    return {};
  }
  // await client.api.options.chain({ symbol: instrument.symbol, expiration, range, stop: true });
  // client.api.options.chain({ symbol: instrument.symbol, expiration, range, stream: true });
  if (userId !== null && userId !== undefined) chain.addSigner(userId);
  return { instrument, expiration, strikes: chain.strikes, chain: chain.values };
};
