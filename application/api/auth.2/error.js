({
  access: 'public',
  method: ({ data }) => {
    console.error('error on token:', data);
    console.error('error on client:', context.client);
    return 'OK';
  },
});
