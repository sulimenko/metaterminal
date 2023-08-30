({
  access: 'public',
  method: async ({ data }) => {
    console.log('metacom sendOrder', data);
    // return lib.ptfin({ accounts });
  },
});
