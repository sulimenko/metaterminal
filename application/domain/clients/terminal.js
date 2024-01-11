({
  values: new Map(),
  setClient({ userId, client }) {
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
      if (value.session.state.accounts.includes(account)) clients.push(value);
    }
    return clients;
  },
});
