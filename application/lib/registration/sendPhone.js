async ({ formData }) => {
  const method = 'registration/phone';
  const data = { data: formData };

  return lib.ptfin.sendPost({ method, data });
};
