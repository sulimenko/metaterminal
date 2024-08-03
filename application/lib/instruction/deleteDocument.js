({ id, revision }) => {
  const method = 'registration/delete_document';
  return lib.ptfin.sendPost({ method, data: { id, revision } });
};
