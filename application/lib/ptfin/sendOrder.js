/* eslint-disable camelcase */
async ({ data, instrument }) => {
  const method = 'data/new_recommendation';

  // console.log('new_recommendation', config.ptfin.main.url + method, data, instrument);
  const result = await metarhia.metautil
    .fetch(config.ptfin.main.url + method, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_token: config.ptfin.main.token, data, instrument }),
    })
    .then((res) => (res.status === 200 ? res.json() : res.text()));

  console.warn('ptfin sendOrder: ', JSON.stringify(result));
  return result;
};
