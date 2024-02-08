// eslint-disable-next-line no-unused-vars
async ({ sid, account }) => {
  const WebSocket = npm.ws;
  const url = 'wss://wss.tradernet.com?SID=' + sid;
  // const url = 'wss://wss.tradernet.com/?user_id=3060837';
  const client = new WebSocket(url);
  // console.log(url);

  return new Promise((resolve) => {
    client.on('connect', function () {
      console.log('connect');
    });
    client.onopen = function () {
      console.log('onopen');
      setInterval(() => (client.ping(), console.warn('send PING')), 30000);
      // client.send(JSON.stringify(['orderBook', ['AAPL.US', 'TSLA.US']]));
      client.send(JSON.stringify(['session']));
      client.send(JSON.stringify(['orders']));
      // client.send(JSON.stringify(['portfolio']));
      resolve(client);
    };

    client.onmessage = function ({ data }) {
      const [event, messageData] = JSON.parse(data);
      if (!['keepAlive'].includes(event)) {
        if (event === 'orders') {
          // console.log(messageData);
          lib.tn.updateStatus({ account, orders: messageData });
          // } else if (event === 'b') {}
        } else {
          console.warn(event, messageData);
        }
      }
    };

    client.on('pong', () => console.warn('get PONG'));

    client.onclose = function (e) {
      console.error('sockets closed', e);
      domain.clients.tn.deleteClient({ name: account });
      // Попробуем подключиться через 2 секунд после разрыва
      setTimeout(() => domain.clients.tn.getClient({ keys: { name: account } }), 2000);
    };

    client.onerror = function (error) {
      console.error('Sockets.error: ', error);
      client.close();
    };
  });
};
