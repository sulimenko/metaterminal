async () => {
  if (application.worker.id === 'W2') {
    const client = await domain.clients.tn.getClient({ keys: { name: '1185789' } });
    console.log('start tn: 1185789 ', client.readyState);
  }
};
