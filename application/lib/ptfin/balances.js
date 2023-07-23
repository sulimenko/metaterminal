/* eslint-disable camelcase */
async ({ accounts }) => {
  const url = 'http://partnerfinance.test/api/data/';
  const method = 'balance';
  const token = 'SVFEBZj4yQ';
  const data = { api_token: token, accounts };

  console.log(data);

  // const metacom = metarhia.metacom.Metacom.create(url);
  // console.log(metacom.ready());
  // console.log(metarhia.metacom.Metacom.call(url));

  // console.log(node.https.request(url));

  // fetch('https://jsonplaceholder.typicode.com/todos/1');
  // .then((json) => console.log(json))
  // .then((response) => {
  // return response.json();
  // });

  // return req;
  // req.end();
  // console.log(res);

  const res = await metarhia.metautil.fetch(url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
