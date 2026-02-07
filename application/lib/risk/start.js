async () => {
  console.debug(`lib.risk.start begin ${application.worker.id}`);
  if (application.worker.id === 'W1') {
    console.info('start lib.risk');
    await lib.utils.wait(100);
    try {
      const meta = await lib.risk.exclusions.getMeta();
      console.info('risk exclusions meta', meta);
    } catch (error) {
      console.warn('risk exclusions meta failed', error?.message || error);
    }

    // application.scheduler.stop('risk-ptp1446f');
    // const scheduler = config.risk?.scheduler || {};
    // if (!scheduler?.enabled) return;
    // // const at = scheduler.at || '23h';

    // setTimeout(async () => {
    //   const res = await application.scheduler.add({
    //     name: 'risk-ptp1446f',
    //     // every: at,
    //     every: '10s',
    //     args: {},
    //     run: 'lib.risk.runUpdateOnW1',
    //   });
    //   console.info('Add task', res);
    // }, 3000);
  }
  console.debug(`lib.risk.start end ${application.worker.id}`);
};
