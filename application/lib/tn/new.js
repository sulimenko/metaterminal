// eslint-disable-next-line no-unused-vars
async ({ sid, account }) => {
  const WebSocket = npm.ws;
  const url = 'wss://wss.tradernet.com?SID=' + sid;
  const client = new WebSocket(url);

  return new Promise((resolve) => {
    let ping = 0;
    client.on('connect', function () {
      console.log('connect');
    });

    client.onopen = function () {
      console.log('onopen ws', account);
      ping = setInterval(() => (client.ping(), console.warn('send PING', account)), 30000);
      client.send(JSON.stringify(['session']));
      client.send(JSON.stringify(['orders']));
      // client.send(JSON.stringify(['orderBook', ['AAPL.US', 'TSLA.US']]));
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
          console.warn(account, event, messageData);
        }
      }
    };

    client.on('pong', () => console.warn('get PONG', account));

    client.onclose = function (e) {
      console.error('sockets closed', 'code:', e.code);
      console.error('clean:', e.wasCleane, 'reason:', e.reason);
      clearInterval(ping);
      domain.clients.tn.deleteClient(account);
      // Попробуем подключиться через 2 секунд после разрыва
      setTimeout(() => domain.clients.tn.getClient(account), 2000);
    };

    client.onerror = function (error) {
      console.error('Sockets.error: ', error);
      client.close();
    };
  });
};
