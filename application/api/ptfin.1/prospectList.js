({
  access: 'private',
  method: async ({ ids }) => {
    return lib.ptfin.prospectList({ ids });
  },
});
