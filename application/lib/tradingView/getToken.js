/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
async () => {
  const url = 'https://www.tradingview.com/accounts/signin/';
  const headers = {
    Referer: 'https://www.tradingview.com',
  };

  const form = new FormData();
  form.append('username', 'sulimenko@ptfin.kz');
  form.append('password', '7n8zGZ8v27pH');
  form.append('remember', 'on');

  // const res = await metarhia.metautil.fetch(url, {
  //   method: 'POST',
  //   headers,
  //   body: form,
  // });

  const auth_token =
    'eyJhbGciOiJSUzUxMiIsImtpZCI6IkdaeFUiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyX2lkIjoxMjI1ODcxMiwiZXhwIjoxNjkwNzMyNzY0LCJpYXQiOjE2OTA3MTgzNjQsInBsYW4iOiJwcm9fcHJlbWl1bSIsImV4dF9ob3VycyI6MSwicGVybSI6IiIsInN0dWR5X3Blcm0iOiJ0di1jaGFydF9wYXR0ZXJucyx0di12b2x1bWVieXByaWNlLHR2LXByb3N0dWRpZXMsdHYtY2hhcnRwYXR0ZXJucyIsIm1heF9zdHVkaWVzIjoyNSwibWF4X2Z1bmRhbWVudGFscyI6MCwibWF4X2NoYXJ0cyI6OCwibWF4X2FjdGl2ZV9hbGVydHMiOjQwMCwibWF4X3N0dWR5X29uX3N0dWR5IjoyNCwibWF4X2FjdGl2ZV9wcmltaXRpdmVfYWxlcnRzIjo0MDAsIm1heF9hY3RpdmVfY29tcGxleF9hbGVydHMiOjQwMCwibWF4X2Nvbm5lY3Rpb25zIjo1MH0.B-yK-4PXwKeDgC0iCN4JeriorJFvDUSzldZVtg7DI-0KKJVYPa0n0UKYMYzaHTSDhqlFsNa9YA_PZ2dWPmdvK2YCzBG7BVG2fPGqvqlQwa-GgFtosrBzKXLj8OQGP329mMzXF7G069weHm7mpAoKnihU1s_YyaAWZY2caNccadI';

  return auth_token;
};
