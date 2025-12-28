async ({ symbol }) => {
  const client = await domain.clients.ts.getClient();
  const expirations = await client.api.options.expirations({ symbol });

  const types = { Weekly: 2, Monthly: 3, Quarterly: 4 };
  const result = [];
  for (const each of expirations) result.push({ expiration: new Date(each.Date).getTime(), significant: types[each.Type] || 1 });
  // console.info('Option expirations for', symbol, result);
  return result;
};
