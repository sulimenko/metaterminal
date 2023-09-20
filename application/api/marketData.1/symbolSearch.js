({
  access: 'public',
  method: async (needle) => {
    console.log(needle);
    const haystack = await metarhia.metautil.fetch('https://symbol-search.tradingview.com/symbol_search/?text=' + needle, {
      method: 'GET',
    });
    const json = await haystack.json();
    return json.filter((each) => ['NASDAQ', 'NYSE', 'AMEX', 'OTC', 'LSE', 'LSEIOB1'].includes(each.prefix || each.exchange));
    // return haystack.json();
  },
});
