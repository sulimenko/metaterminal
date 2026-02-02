/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ data }) => {
    const { type, id, error } = data;
    if (error.code !== 403) {
      console.error('error on data:', data);
      console.error('error on client:', context.client);
    }
    return 'OK';
  },
});
