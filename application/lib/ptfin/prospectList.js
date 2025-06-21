async ({ ids }) => {
  if (ids.lenght === 0) return [];
  const method = 'data/clients_list';
  const data = { lists: ids };

  return lib.ptfin.sendPost({ method, data });
};
