({
  access: 'public',
  method: async ({ keys, activityType, direction, date, pageSize }) => {
    const alpaca = lib.utils.alpacaConnect(keys);

    activityType = activityType ? activityType : undefined; // ['FILL', 'CSD', 'CFEE', 'JNLS']
    direction = direction ? direction : 'desc';
    date = date ? date : undefined;
    pageSize = pageSize ? pageSize : 100;
    return alpaca.getAccountActivities({ activityType, direction, date, pageSize });
  },
});
