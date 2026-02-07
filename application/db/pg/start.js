async () => {
  console.debug(`db.pg.start begin ${application.worker.id}`);
  if (application.worker.id === 'W1') {
    console.debug('Connect to pg');
  }
  const options = { ...config.database, console };
  db.pg = new metarhia.metasql.Database(options);
  console.debug(`db.pg.start end ${application.worker.id}`);
};
