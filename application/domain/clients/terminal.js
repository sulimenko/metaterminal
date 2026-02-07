({
  starting: false,
  values: new Map(),
  cleaningTimers: new Map(),
  setClient({ userId, client }) {
    this.values.delete(client.session.state.user_id);
    if (this.cleaningTimers.has(userId)) {
      clearTimeout(this.cleaningTimers.get(userId));
      this.cleaningTimers.delete(userId);
    }

    // console.info('listeners close:', client.listeners('close').length);
    for (const func of client.listeners('close')) {
      // console.info('each:', func.toString());
      if (func.toString().match(/marketData.existChart/) !== null) client.off('close', func);
    }

    client.on('close', () => {
      console.warn('Socket close login:', client.session.state.login);
      this.cleaningTimers.set(
        userId,
        setTimeout(() => lib.marketData.existChart({ userId: client.session.state.user_id }), 30 * 60 * 1000),
      );
    });
    return this.values.set(userId, client);
  },
  getClient({ userId }) {
    let client = this.values.get(userId);
    if (client === undefined) client = this.values.set(userId, null).get(userId);
    return client;
  },
  getByAccount({ account }) {
    const clients = [];
    // console.warn('getByAccount: ', account, this.values);
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of this.values) {
      // console.warn('getByAccount: ', account, value.session.state, value);
      if (value.session.state.accounts && Array.isArray(value.session.state.accounts) && value.session.state.accounts.includes(account))
        clients.push(value);
    }
    return clients;
  },
});
