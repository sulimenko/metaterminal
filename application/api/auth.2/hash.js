/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ message }) => {
    console.log(message);
    return metarhia.metautil.hashPassword(message);
  },
});
