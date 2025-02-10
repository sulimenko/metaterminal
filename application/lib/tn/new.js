/* eslint-disable object-shorthand */
async ({ account }) => {
  const WebSocket = npm.ws;

  return {
    access: { sid: null, account },
    settings: { connectTimeout: 30, heartbeatInterval: 30, pingPongTime: 5, restartTime: 2, maxReconnect: 20 },
    timers: { open: null, ping: null, heartbeat: null, restart: null },
    reconnect: 0,
    ws: null,

    heartbeat: function () {
      if (this.timers.heartbeat === null) {
        this.ws.on('ping', () => this.ws.pong());
        this.ws.on('pong', () => {
          console.warn('get PONG', this.access.account);
          clearTimeout(this.timers.ping); // Убираем таймер, если получили PONG
        });

        this.timers.heartbeat = setInterval(() => {
          if (!this.ws || this.ws.readyState !== 1) {
            console.warn('WS ' + this.access.account + ' is not in OPEN state, restarting...');
            this.restart();
            return;
          }

          this.ws.ping();
          console.warn('send PING ' + this.access.account);

          clearTimeout(this.timers.ping); // Очищаем предыдущий таймер
          this.timers.ping = setTimeout(() => {
            console.log('No PONG ' + this.access.account + 'received, reconnecting...');
            this.restart();
          }, this.settings.pingPongTime * 1000); // Ждём PONG 5 секунд
        }, this.settings.heartbeatInterval * 1000);
      }
    },

    restart: function () {
      if (this.reconnect >= this.settings.maxReconnect) {
        console.error('Max reconnect attempts reached for ' + this.access.account + ', stopping.');
        return;
      }

      clearTimeout(this.timers.open);
      clearTimeout(this.timers.ping);
      clearInterval(this.timers.heartbeat);
      if (this.timers.restart === null) {
        // const wait = (this.reconnect + 1) * this.settings.restartTime;
        const wait = Math.min(2 ** this.reconnect, 30) * this.settings.restartTime;
        // Попробуем подключиться через (Math.min(2^reconnect, 30) * 2 секунды) после разрыва
        console.log('Restarting WS ' + this.access.account + ' attempt ' + this.reconnect + ', wait: ' + wait);
        this.timers.restart = setTimeout(() => {
          this.timers.restart = null;
          this.reconnect++;
          this.connect(this.access.sid);
        }, wait * 1000);
      }
    },

    connect: function (sid) {
      console.log('Connecting WS ' + this.access.account);

      this.access.sid = sid;

      clearTimeout(this.timers.open);
      clearTimeout(this.timers.ping);
      clearTimeout(this.timers.restart);
      clearInterval(this.timers.heartbeat);
      this.ws?.close(); // Принудительно закрываем если есть соединение

      this.ws = new WebSocket('wss://wss.tradernet.com?SID=' + this.access.sid);

      // Таймер на случай, если сервер не отвечает
      this.timers.open = setTimeout(() => {
        console.error('WS connection timeout ' + this.access.account + ', restarting...');
        this.ws?.close(); // Принудительно закрываем зависшее соединение
        this.restart();
      }, this.settings.connectTimeout * 1000);

      this.ws.onopen = () => {
        console.log('WS connected ' + this.access.account);
        this.reconnect = 0; // Сброс попыток переподключения
        clearTimeout(this.timers.open);
        this.heartbeat(); // Запуск пинг-понга

        this.ws.send(JSON.stringify(['session']));
        this.ws.send(JSON.stringify(['orders']));
        // this.ws.send(JSON.stringify(['orderBook', ['AAPL.US', 'TSLA.US']]));
        // this.ws.send(JSON.stringify(['portfolio']));
      };

      this.ws.onmessage = ({ data }) => {
        // console.log('onmessage', data);
        const [event, messageData] = JSON.parse(data);
        if (event !== 'keepAlive') {
          if (event === 'orders') {
            // console.log(messageData);
            lib.tn.updateStatus({ account: this.access.account, orders: messageData });
            // } else if (event === 'b') {}
          } else {
            console.warn(this.access.account, event, messageData);
          }
        }
      };

      this.ws.onerror = (error) => {
        console.error('WS error ' + this.access.account, error);
        this.restart();
      };

      this.ws.onclose = (event) => {
        console.warn('WS closed ' + this.access.account + ', code: ' + event.code);
        this.restart();
      };
    },
  };
};
