({
  access: 'public',
  method: async (needle) => {
    console.log(needle);
    const haystack = await metarhia.metautil.fetch('https://symbol-search.tradingview.com/symbol_search/?text=' + needle, {
      method: 'GET',
    });
    // return haystack.json();
    const json = await haystack.json();
    const list = json.filter((each) =>
      ['NASDAQ', 'NYSE', 'AMEX', 'OTC', 'LSE', 'LSEIOB1', 'COINBASE'].includes(each.prefix || each.exchange),
    );
    for (const each of list) each.source = each.prefix !== undefined ? each.prefix : each.exchange;
    // console.log(list);
    return list;
  },
});
