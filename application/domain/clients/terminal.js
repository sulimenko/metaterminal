({
  values: new Map(),
  setClient({ userId, client }) {
    client.on('close', () => {
      console.warn('Socket close user_id:', client.session.state.user_id);
      lib.marketData.existChart({ userId: client.session.state.user_id });
    });
    return this.values.set(userId, client);
  },
  getClient({ userId }) {
    let data = this.values.get(userId);
    if (data === undefined) data = this.values.set(userId, null).get(userId);
    return data;
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
