({ type, form, options = {} }) => {
  const method = 'registration/form';
  return lib.ptfin.sendPost({ method, data: { type, form, options } });
};
