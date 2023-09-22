/* eslint-disable camelcase */
async ({ data }) => {
  const method = 'new_recommendation';

  console.log('new_recommendation', config.ptfin.main.url + method, data);
  // const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ api_token: config.ptfin.main.token, data }),
  // });
  //
  // return res.json();
  return JSON.stringify([]);
};
