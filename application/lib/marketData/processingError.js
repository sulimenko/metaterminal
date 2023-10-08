async ({ error }) => {
  console.log('processingError: ', error);
  if (domain.marketData.error.getSize > 3) return void domain.marketData.error.restart();
  return domain.marketData.error.addError({ error });
};
