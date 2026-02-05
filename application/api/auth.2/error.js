({
  access: 'public',
  method: async ({ data }) => {
    console.error('error on token:', data);
    console.error('error on client:', context.client);
    return 'OK';
  },
});
