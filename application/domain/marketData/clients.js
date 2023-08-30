({
  // default: () => {
  //   return [];
  // },
  values: new Map(),
  getClient({ userId }) {
    let data = this.values.get(userId);
    if (data === undefined) data = this.values.set(userId, null).get(userId);
    return data;
  },
  setClient({ userId, client }) {
    return this.values.set(userId, client);
  },
});
