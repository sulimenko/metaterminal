({
  access: 'private',
  method: async ({ data, instrument }) => {
    // console.info('metacom sendOrder', data, instrument);
    data.user = context.client.session.state.user_id;
    return lib.ptfin.sendOrder({ data, instrument });
  },
});
