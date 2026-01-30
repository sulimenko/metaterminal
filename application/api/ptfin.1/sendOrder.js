({
  access: 'private',
  method: async ({ data, instrument }) => {
    // console.info('metacom sendOrder', data, instrument);
    data.user = context.client.session.state.user_id;
    // TODO: enable exclusion check once payload structure is confirmed
    // const ticker = instrument?.symbol || data?.symbol;
    // const isin = instrument?.isin || data?.isin;
    // if (await lib.risk.isExcluded({ ticker, isin })) return { status: 'blocked', reason: 'risk-ptp-1446f' };
    return lib.ptfin.sendOrder({ data, instrument });
  },
});
