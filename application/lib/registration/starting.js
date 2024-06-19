async ({ formData }) => {
  const method = 'registration/starting';
  const data = { data: formData };

  return lib.ptfin.sendPost({ method, data });
};
