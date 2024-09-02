({
  access: 'public',
  method: async (needle) => {
    console.log(needle);
    if (typeof needle === 'object') needle = needle.data;
    const haystack = await fetch(
      'https://symbol-search.tradingview.com/symbol_search/?text=' + needle,
      // 'https://symbol-search.tradingview.com/symbol_search/v3/?text=TSLA&hl=1&exchange=&lang=ru&search_type=undefined&domain=production&sort_by_country=RU',
      {
        // credentials: 'omit',
        // mode: 'cors',
        // referrerPolicy: 'origin-when-cross-origin',
        // referrer: 'https://ru.tradingview.com',
        headers: {
          Origin: 'https://ru.tradingview.com',
          // Referer: 'https://ru.tradingview.com/',
          // 'Sec-Fetch-Site': 'same-site',
        },
      },
    );
    // console.warn(await haystack.json());

    const json = await haystack.json();
    const list = json.filter((each) =>
      ['NASDAQ', 'NYSE', 'AMEX', 'OTC', 'LSE', 'LSEIOB1', 'BINANCE'].includes(each.prefix || each.exchange),
    );
    for (const each of list) each.source = each.prefix !== undefined ? each.prefix : each.exchange;
    // console.log(list);
    return list;
  },
});
