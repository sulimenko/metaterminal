async ({ ids }) => {
  if (ids.lenght === 0) return [];
  const path = 'data/clients_list';
  const data = { lists: ids };

  return lib.ptfin.sendPost({ path, data });
};
