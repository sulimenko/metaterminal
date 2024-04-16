/* eslint-disable camelcase */
async ({ method, data }) => {
  const send_data = { api_token: config.ptfin.main.token };
  for (const key of Object.keys(data)) send_data[key] = data[key];

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify(send_data),
  });

  return res.status === 200 ? res.json() : res.text();
};
