({ id, revision }) => {
  const path = 'registration/delete_document';
  return lib.ptfin.sendPost({ path, data: { id, revision } });
};
