async ({ error }) => {
  console.warn('processingError: ', error);
  // if (domain.marketData.error.getSize > 1)
  return void domain.marketData.error.restart();
  // return domain.marketData.error.addError({ error });
};
