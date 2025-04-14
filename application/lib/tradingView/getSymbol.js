async ({ symbol, type }) => {
  // type = 'stock' | 'futures' | 'forex' | 'cfd' | 'crypto' | 'index' | 'economic'
  // query = what you want to search!
  const res = await fetch('https://symbol-search.tradingview.com/symbol_search?text=' + symbol + '&type=' + type);
  if (res.status === 200) {
    const data = await res.json();
    return data[0];
  }

  return 'Network Error!';
};
