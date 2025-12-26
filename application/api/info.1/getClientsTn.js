({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.warn('getClientsTn: ', domain.clients.tn.values);
    return 'ok';
  },
});
