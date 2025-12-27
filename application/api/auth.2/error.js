({
  access: 'public',
  method: function ({ data }) {
    lib.log.info({ params: arguments[0] });
    console.error('error on client token:', data, context.client);
    return 'OK';
  },
});
