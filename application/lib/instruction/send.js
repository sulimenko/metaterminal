({ type, data }) => {
  const path = 'instruction/new';
  console.info('lib metaterminal :', type, data);
  return lib.ptfin.sendPost({ path, data: { type, data } });
};
