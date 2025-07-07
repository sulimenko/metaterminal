async ({ update }) => {
  for (const client of domain.clients.terminal.getByAccount({ account: update.account })) {
    client.emit('analytics/newSelection', update);
  }
  return ['OK'];
};
