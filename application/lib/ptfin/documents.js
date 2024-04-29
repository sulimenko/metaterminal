async ({ userId }) => {
  if (!userId) return {};
  const method = 'data/documents';
  const data = { user: [userId] };
  console.log('metaterminal :', data);
  return lib.ptfin.sendPost({ method, data });
};
