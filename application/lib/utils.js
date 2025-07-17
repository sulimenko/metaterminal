({
  UNITS: ['', ' Kb', ' Mb', ' Gb', ' Tb', ' Pb', ' Eb', ' Zb', ' Yb'],

  bytesToSize(bytes) {
    if (bytes === 0) return '0';
    const exp = Math.floor(Math.log(bytes) / Math.log(1000));
    const size = bytes / 1000 ** exp;
    const short = Math.round(size, 2);
    const unit = this.UNITS[exp];
    return short + unit;
  },

  UNIT_SIZES: {
    yb: 24, // yottabyte
    zb: 21, // zettabyte
    eb: 18, // exabyte
    pb: 15, // petabyte
    tb: 12, // terabyte
    gb: 9, // gigabyte
    mb: 6, // megabyte
    kb: 3, // kilobyte
  },

  sizeToBytes(size) {
    if (typeof size === 'number') return size;
    const [num, unit] = size.toLowerCase().split(' ');
    const exp = this.UNIT_SIZES[unit];
    const value = parseInt(num, 10);
    if (!exp) return value;
    return value * 10 ** exp;
  },

  makeResult(command, data) {
    return {
      command: command ? command : 'empty',
      data: data ? data : {},
      error: false,
      errorText: '',
    };
  },

  getMilliseconds() {
    return new Date().getTime();
  },

  async wait(delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve('done'), delay);
    });
  },

  microtime() {
    return new Date().getTime() / 1000;
  },

  preSign(req) {
    const r = [];
    for (const key of Object.keys(req).sort()) {
      if (Array.isArray(req[key])) req[key] = this.preSign(req[key]);
      r.push(key + '=' + req[key]);
    }
    return r.join('&');
  },

  hmacHash(algorithm, key, data) {
    const hmac = node.crypto.createHmac(algorithm, key);
    hmac.update(data);
    return hmac.digest('hex');
  },

  parseCookie(str) {
    // console.info(str);
    return str !== null
      ? str
          .split(';')
          .map((v) => v.split('='))
          .reduce((acc, v) => {
            if (v[0] && v[1]) acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
          }, {})
      : {};
  },

  makeOptSymbol(symbol) {
    const pattern = /^([A-Za-z]{1,5})(\d{6})([CP])(\d{8})$/;
    const matches = symbol.match(pattern);
    if (matches) {
      return matches[1] + ' ' + matches[2] + matches[3] + parseFloat(matches[4].substr(0, 5) + '.' + matches[4].substr(5, 3));
    }
    return null;
  },

  makeTsBar(bar) {
    return {
      open: bar.Open,
      high: bar.High,
      low: bar.Low,
      close: bar.Close,
      timestamp: bar.Epoch,
      volume: bar.TotalVolume,
    };
  },

  // async get({ url }) {
  //   return new Promise((resolve) => {
  //     const protocol = url.indexOf('https:') === -1 ? node.http : node.https;
  //     let body = '';
  //
  //     protocol.get(url, (res) => {
  //       res.on('data', (chunk) => {
  //         body += chunk;
  //       });
  //       res.on('end', () => {
  //         resolve(body);
  //       });
  //     });
  //   });
  // },
});
