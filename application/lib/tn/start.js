async () => {
  console.debug(`lib.tn.start begin ${application.worker.id}`);
  if (application.worker.id === 'W1') {
    setTimeout(() => lib.tn.connectWS(), 1000);
    console.debug(`lib.tn.start scheduled connectWS ${application.worker.id}`);
  }
  console.debug(`lib.tn.start end ${application.worker.id}`);
};
