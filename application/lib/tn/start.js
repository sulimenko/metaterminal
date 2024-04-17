async () => {
  if (application.worker.id === 'W2') {
    setTimeout(() => lib.tn.connectWS(), 1000);
  }
};
