({
  access: 'public',
  method: async (form) => {
    // console.log('anketa:', form);
    return lib.registration.form({ form });
  },
});
