/* eslint-disable camelcase */
async ({ method, data, type = 'application/json' }) => {
  // const send_data = { api_token: config.ptfin.main.token };
  const send_data = {};
  for (const key of Object.keys(data)) send_data[key] = data[key];

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': type,
      Authorization: 'Bearer ' + config.ptfin.main.token,
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify(send_data),
  });

  return res.status === 200 ? res.json() : res.text();
};
