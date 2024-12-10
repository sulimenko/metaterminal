({ type, data }) => {
  const method = 'instruction/new';
  console.log('lib metaterminal :', type, data);
  return lib.ptfin.sendPost({ method, data: { type, data } });
};
