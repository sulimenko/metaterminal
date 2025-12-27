({
  access: 'public',
  method: async function ({ message }) {
    lib.log.info({ params: arguments[0] });
    console.info(message);
    return metarhia.metautil.hashPassword(message);
  },
});
