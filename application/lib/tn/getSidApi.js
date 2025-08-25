async (account, update = false) => {
  const path = 'terminal/get_sid';
  const data = { account, update };

  const result = await lib.ptfin.sendPost({ path, data });
  console.info('getSidApi', account, result);
  return result.SID;

  // const data = { cmd: 'getAuthInfo', apiKey: keys.pkey, nonce: lib.utils.microtime() * 10000 };
  // const headers = new Headers({
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'X-NtApi-Sig': lib.utils.hmacHash('sha256', keys.secret, lib.utils.preSign(data)),
  // });
  // const arr = [];
  // for (const key of Object.keys(data)) {
  //   arr.push(key + '=' + data[key]);
  // }
  // const body = arr.join('&');

  // console.info(body);
  // const result = await fetch('https://tradernet.com/api/v2/cmd/' + data.cmd, {
  //   method: 'POST',
  //   headers,
  //   body,
  // }).then(async (res) =>
  //   res.status === 200 ? { cookie: lib.utils.parseCookie(res.headers.get('set-cookie')), body: await res.json() } : res.text(),
  // );

  // return result.cookie.SID;
};
