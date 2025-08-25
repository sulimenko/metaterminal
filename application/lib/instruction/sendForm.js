({ type, form, options = {} }) => {
  const path = 'registration/form';
  return lib.ptfin.sendPost({ path, data: { type, form, options } });
};
