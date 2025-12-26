({
  access: 'private',
  method: async function ({ ids }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.prospectList({ ids });
  },
});
