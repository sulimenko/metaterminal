({
  access: 'public',
  method: async (needle) => {
    console.log(needle);
    const haystack = await metarhia.metautil.fetch('https://symbol-search.tradingview.com/symbol_search/?text=' + needle, {
      method: 'GET',
    });
    // return haystack.json();
    const json = await haystack.json();
    return json.filter((each) => ['NASDAQ', 'NYSE', 'AMEX', 'OTC', 'LSE', 'LSEIOB1', 'COINBASE'].includes(each.prefix || each.exchange));
  },
});
