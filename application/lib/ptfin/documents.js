async ({ id }) => {
  if (!id) return [];
  const method = 'data/documents';
  const data = { ids: [id] };
  // console.info('metaterminal :', data);

  return lib.ptfin.sendPost({ method, data });
};
