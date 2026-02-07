async () => {
  console.debug(`lib.invoke1.start begin ${application.worker.id}`);
  if (!config.examples.invoke) return;
  if (application.worker.id !== 'W1') return;
  const res = await application.invoke({
    method: 'lib.invoke1.method1',
    args: { key: 'value' },
    exclusive: true,
  });
  console.info('Invoke example', res);
  console.debug(`lib.invoke1.start end ${application.worker.id}`);
};
