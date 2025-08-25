async ({ id }) => {
  if (!id) return [];
  const path = 'data/documents';
  const data = { ids: [id] };
  // console.info('metaterminal :', data);

  return lib.ptfin.sendPost({ path, data });
};
