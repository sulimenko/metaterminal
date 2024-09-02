async () => {
  if (application.worker.id !== 'W2') return;
  console.log(application.worker, 'stoped now');
  await domain.marketData.tvClient.close();
};
