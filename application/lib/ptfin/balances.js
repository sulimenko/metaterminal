/* eslint-disable camelcase */
async ({ accounts }) => {
  const method = 'balance';

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
  // console.log(config.ptfin);

  const res = await metarhia.metautil.fetch(config.ptfin.main.url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
    },
    body: JSON.stringify({ api_token: config.ptfin.main.token, accounts }),
  });

  return res.json();
};
