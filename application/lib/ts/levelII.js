async (data) => {
  //   metacom.api.stream.on('levelII', (data) => lib.ts.levelII(data));
  // metacom.api.stream.matrix({ symbol: 'ORCL 251003P287.5' });

  // console.info(domain.clients.terminal.values);
  const client = domain.clients.terminal.getClient({ userId: '677779fa-299a-36ff-18f3-5ddbc6023dd8' });
  return client.emit('marketData/levelII', data);
};
