({
  access: 'public',
  method: async function ({ ...args }) {
    lib.log.info({ params: arguments[0] });
    console.debug({ remoteMethod: args });
    return { result: 'success' };
  },
});
