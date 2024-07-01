({ form }) => {
  const method = 'registration/enrichment';
  return lib.ptfin.sendPost({ method, data: { form } });
};
