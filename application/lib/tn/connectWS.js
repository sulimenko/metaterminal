async (update = false) => {
  const tnAccountWS = await lib.ptfin.getTnAccount({ accounts: [] });
  for (const each of tnAccountWS) {
    const client = await domain.clients.tn.getClient(each.name, update);
    console.log('start tn:', each.name, client?.readyState || client);
  }
  return 'finish';
};
