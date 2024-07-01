async ({ form }) => {
  const method = 'registration/starting';
  const data = { data: form };

  return lib.ptfin.sendPost({ method, data });
};
