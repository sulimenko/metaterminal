({
  access: 'public',
  method: ({ data }) => {
    console.error('error on client token:', data, context.client);
    return 'OK';
  },
});
