/* eslint-disable camelcase */
async ({ userId }) => {
  const method = 'data/accounts';

  if (!userId) return {};
  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify({ api_token: config.ptfin.main.token, user: userId }),
  });

  return res.json();
};
