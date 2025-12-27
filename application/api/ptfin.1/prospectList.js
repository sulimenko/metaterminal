({
  access: 'private',
  method: async function ({ ids }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.prospectList({ ids });
  },
});
