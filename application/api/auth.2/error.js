({
  access: 'public',
  method: function ({ data }) {
    lib.log.info({ args: Array.from(arguments) });
    console.error('error on client token:', data, context.client);
    return 'OK';
  },
});
