/* eslint-disable camelcase */
async ({ data, instrument }) => {
  const path = 'data/new_recommendation';
  const send_data = { data, instrument };

  const symbol = instrument?.symbol || data?.symbol;
  const isin = instrument?.isin || data?.isin;
  if (await lib.risk.exclusions.isExcluded({ symbol, isin })) return { status: 'blocked', reason: 'risk-ptp-1446f' };
  // return lib.ptfin.sendPost({ path, data: send_data });
  domain.ptfin.queue.addTask({ path, data: send_data });
  // return domain.ptfin.send(send_data);
  // const result = await domain.ptfin.send(send_data);
  return { status: 'addTask', reason: '' };
};
