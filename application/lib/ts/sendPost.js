/* eslint-disable camelcase */
async ({ method, data, type = 'application/json' }) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25 * 1000); // 25 секунд

  console.info('Sending POST:', config.ts.main.url + ':' + config.ts.main.port + '/api/' + method, data);

  try {
    const res = await fetch(config.ts.main.url + ':' + config.ts.main.port + '/api/' + method, {
      method: 'POST',
      headers: {
        'Content-Type': type,
        // Authorization: 'Bearer ' + config.ptfin.main.token,
        // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
        signal: controller.signal,
      },
      body: JSON.stringify(data),
    });

    clearTimeout(timeoutId);
    const response = res.status === 200 ? await res.json() : await res.text();
    return response;
  } catch (error) {
    if (error.name === 'AbortError') console.error('Request aborted by timeout!');
    else console.error('Request error code', error.message);
    return 'error';
  }
};
