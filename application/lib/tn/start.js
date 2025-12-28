async () => {
  if (application.worker.id === 'W1') {
    setTimeout(() => lib.tn.connectWS(), 1000);
  }
};
