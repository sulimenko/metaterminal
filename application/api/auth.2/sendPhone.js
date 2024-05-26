({
  access: 'private',
  method: async (data) => {
    const response = await lib.ptfin.sendPhone({ data });

    console.warn('22 :', response);
    console.log('metaterminal phone:', data);
    return response;
  },
});
