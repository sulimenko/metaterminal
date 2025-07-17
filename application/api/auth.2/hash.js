({
  access: 'public',
  method: async ({ message }) => {
    console.info(message);
    return metarhia.metautil.hashPassword(message);
  },
});
