({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.warn('getClientsTn: ', domain.clients.tn.values);
    return 'ok';
  },
});
