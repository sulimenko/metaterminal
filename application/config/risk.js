({
  sources: [
    { name: 'itiger', url: 'https://www.itiger.com/sg/bulletin/ptp', columns: { symbol: 0, isin: 1 } },
    {
      name: 'exante',
      url: 'https://support.exante.eu/en/articles/114072-withholding-on-publicly-traded-partnerships',
      columns: { symbol: 1, isin: 2 },
    },
  ],
  redis: {
    key: 'risk:1446f:exclusions',
    ttlSec: 24 * 60 * 60,
  },
  scheduler: {
    enabled: true,
    at: '23h',
  },
  min: {
    symbols: 20,
    isins: 20,
  },
  fetch: {
    timeoutMs: 20 * 1000,
    userAgent: 'metaterminal-risk/1.0',
  },
  parsing: {
    maxSymbolLength: 10,
  },
});
