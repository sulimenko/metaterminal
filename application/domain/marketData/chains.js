({
  defaultChain: ({ instrument, expiration }) => {
    const chain = { instrument, expiration, status: 'loading', strikes: [], values: {}, signers: new Set() };
    // chain.getChain = () => ({ instrument, expiration, range: chain.range, strikes: chain.strikes, chain: chain.values });
    chain.getSigners = () => chain.signers;
    chain.stop = async (userId) => domain.marketData.chains.gracefulStop({ userId, instrument, expiration });
    chain.addData = (data) => {
      for (const strike of Object.keys(data)) {
        for (const type of Object.keys(data[strike])) {
          if (chain.values[strike] === undefined) chain.values[strike] = {};
          chain.values[strike][type] = data[strike][type];
        }
      }
    };
    chain.addSigner = (userId) => chain.signers.add(userId);
    chain.deleteSigner = (userId) => {
      chain.signers.delete(userId);
      if (chain.signers.size === 0) chain.stop();
      return;
    };
    return chain;
  },
  values: {},

  async getStrikes({ instrument, expiration }) {
    const symbol = this.values[instrument.symbol];
    const client = await domain.clients.ts.getClient();
    const strikes = await client.api.options.strikes({ symbol: instrument.symbol, expiration });
    symbol[expiration].strikes = strikes.Strikes.map((s) => s[0]);
    return strikes;
  },
  async addExpiration({ instrument, expiration }) {
    if (this.values[instrument.symbol] === undefined) this.values[instrument.symbol] = {};
    this.values[instrument.symbol][expiration] = this.defaultChain({ instrument, expiration });
    await this.getStrikes({ instrument, expiration });
    this.values[instrument.symbol][expiration].status = 'ready';
    return this.values[instrument.symbol];
  },
  async getChainData({ instrument, expiration }) {
    let symbol = this.values[instrument.symbol];
    if (symbol !== undefined && symbol[expiration] !== undefined) return symbol[expiration];

    symbol = await this.addExpiration({ instrument, expiration });
    // if (range > symbol[expiration].range) {
    //   await this.gracefulStop({ chain: symbol[expiration] });
    //   return this.getChainData({ instrument, expiration, range });
    // }
    // symbol[expiration].range = range;
    const range = Math.ceil(symbol[expiration].strikes.length / 2);
    const client = await domain.clients.ts.getClient();
    client.api.options.chain({ symbol: instrument.symbol, expiration, range, stream: true });
    return symbol[expiration];
  },
  async gracefulStop({ userId, instrument, expiration }) {
    const chain = await this.getChainData({ instrument, expiration });
    // console.warn(chain);
    chain.signers.delete(userId);
    if (chain.signers.size > 0) return;
    delete this.values[instrument.symbol][expiration];
    if (Object.keys(this.values[instrument.symbol]).length > 0) delete this.values[instrument.symbol];
    // chain.status = 'stopping';
    const client = await domain.clients.ts.getClient();
    client.api.options.chain({ symbol: instrument.symbol, expiration, stream: true, stop: true });
    // if (response.stopped) chain.status = 'stop';
    return;
  },
});
