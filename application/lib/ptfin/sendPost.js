/* eslint-disable camelcase */
async ({ path, data, type = 'application/json' }) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25 * 1000); // 25 секунд

  // const send_data = { api_token: config.ptfin.main.token };
  // const send_data = {};
  // for (const key of Object.keys(data)) send_data[key] = data[key];

  try {
    const res = await fetch(config.ptfin.main.url + path, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': type,
        Authorization: 'Bearer ' + config.ptfin.main.token,
        // , 'Accept-Encoding': 'deflate, gzip, br, zstd'
      },
      body: JSON.stringify(data),
    });

    clearTimeout(timeoutId);
    const response = res.status === 200 ? await res.json() : await res.text();
    return response;
  } catch (error) {
    if (error.name === 'AbortError') console.error('Request aborted by timeout!');
    else console.error('Request error code', error.message);
    return error.message;
  }
};
