async (update = false) => {
  const tnAccountWS = await lib.ptfin.getTnAccount({ accounts: [] });
  for (const each of tnAccountWS) {
    const client = await domain.clients.tn.getClient(each.name, update);
    if (client.ws === null) setTimeout(() => domain.clients.tn.getClient(each.name, true), 10000);
  }
  return 'finish';
};
