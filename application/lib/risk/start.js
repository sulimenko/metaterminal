async () => {
  if (application.worker.id === 'W1') {
    console.info('start lib.risk');
    try {
      const meta = await lib.risk.exclusions.getMeta();
      console.info('risk exclusions meta', meta);
    } catch (error) {
      console.warn('risk exclusions meta failed', error?.message || error);
    }
  }
};
