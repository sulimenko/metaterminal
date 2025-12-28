async () => {
  if (application.worker.id !== 'W1') return;
  console.info(application.worker, 'marketData ws stoped');
  await domain.marketData.tvClient.close();
};
