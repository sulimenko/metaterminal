async () => {
  if (application.worker.id === 'W2') {
    setTimeout(async () => {
      const tnAcc = await lib.ptfin.getTnAccount({ accounts: [] });
      for (const keys of tnAcc) {
        const client = await domain.clients.tn.getClient({ keys });
        console.log('start tn:', keys.name, client?.readyState || client);
      }
    }, 1000);
  }
};
