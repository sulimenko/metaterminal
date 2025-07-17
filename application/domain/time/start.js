async () => {
  if (!config.examples.bus) return;
  if (application.worker.id !== 'W1') return;
  setTimeout(() => {
    bus.worldTime
      .currentTime({
        area: 'Europe',
        location: 'Kiev',
      })
      .then((time) => {
        console.info(`${time.timezone} - ${time.datetime}`);
      })
      .catch(() => {
        console.info('Can not access time server');
      });
  }, 1000);
};
