({
  access: 'public',
  method: async function ({ keys, activityTypes, direction, date, pageSize }) {
    lib.log.info({ params: arguments[0] });
    const alpaca = lib.utils.alpacaConnect(keys);

    activityTypes = activityTypes ? activityTypes : undefined; // ['FILL', 'CSD', 'CFEE', 'JNLS']
    direction = direction ? direction : 'desc';
    const after = date ? date : undefined;
    pageSize = pageSize ? pageSize : 100;

    return alpaca.getAccountActivities({ activityTypes, direction, after, pageSize });
  },
});
