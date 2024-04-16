({
  access: 'public',
  method: async (data) => {
    console.log('anketa:', data);
    return lib.ptfin.sendPost({ method: '', data });
    // return 'OK';
  },
});
