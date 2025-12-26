({
  access: 'public',
  method: async function ({ message }) {
    lib.log.info({ args: Array.from(arguments) });
    console.info(message);
    return metarhia.metautil.hashPassword(message);
  },
});
