({
  access: 'public',
  method: async function ({ ...args }) {
    lib.log.info({ args: Array.from(arguments) });
    console.debug({ remoteMethod: args });
    return { result: 'success' };
  },
});
