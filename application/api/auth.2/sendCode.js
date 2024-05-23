({
  access: 'private',
  method: async (data) => {
    const response = await lib.ptfin.sendCode({ data });

    // console.warn('22 code :', response);
    console.log('metaterminal code:', data);
    return response;
  },
});
