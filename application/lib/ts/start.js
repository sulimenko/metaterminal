async () => {
  if (application.worker.id === 'W2') {
    setTimeout(() => lib.ts.connectWS(), 1000);
  }
};
