({
  access: 'private',
  method: async function ({ data, instrument }) {
    lib.log.info({ params: arguments[0] });
    // console.info('metacom sendOrder', data, instrument);
    data.user = context.client.session.state.user_id;
    return lib.ptfin.sendOrder({ data, instrument });
  },
});
