/* eslint-disable camelcase */

async ({ account }) => {
  //   const url = 'http://partnerfinance.test/api/data/';
  //   const method = 'watch_list';
  //   const token = 'SVFEBZj4yQ';
  //   const data = { api_token: token, account };
  console.log(account);

  //   const res = await metarhia.metautil.fetch(url + method, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   return res.json();

  const wl = {
    U3154743: [
      { symbol: 'MRNA' },
      { symbol: 'AAPL' },
      { symbol: 'TSLA' },
      { symbol: 'PEP' },
      { symbol: 'ROKU' },
      { symbol: 'DDOG' },
      { symbol: 'LC' },
    ],
  };

  return wl[account];
};
