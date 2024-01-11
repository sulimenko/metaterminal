/* eslint-disable no-unused-vars */
async ({ keys }) => {
  const url = 'https://tradernet.com/api/check-login-password';
  const data = {
    login: keys.login,
    password: keys.password,
    rememberMe: 1,
    mode: 'regular',
    userId: keys.userId,
  };
  const arr = [];
  for (const key of Object.keys(data)) {
    arr.push(key + '=' + data[key]);
  }
  const body = arr.join('&');

  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  // console.log(data);
  const result = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
    .then((res) => (res.status === 200 ? res.json() : res.text()))
    .then((data) => data);

  // console.log(result);
  return result.SID;
};
