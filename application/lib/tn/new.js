/* eslint-disable object-shorthand */
async ({ account }) => {
  const WebSocket = npm.ws;

  return {
    access: { sid: null, account },
    settings: { connectTimeout: 30, heartbeatInterval: 30, waitPongTime: 10, restartTime: 2, maxReconnect: 20 },
    timers: { open: null, pong: null, heartbeat: null, restart: null, closing: null },
    reconnect: 0,
    ws: null,

    status: function () {
      if (this.ws === null) return 'EMPTY';
      return ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.ws.readyState] || 'UNKNOWN';
    },

    heartbeat: function () {
      clearTimeout(this.timers.pong);
      clearTimeout(this.timers.heartbeat);
      this.timers.heartbeat = setTimeout(() => {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.ws.ping();
        console.warn('send PING ' + this.access.account);
        this.timers.pong = setTimeout(() => {
          console.log('No PONG ' + this.access.account + ', reconnecting...');
          this.restart();
        }, this.settings.waitPongTime * 1000); // Ждём PONG pingPongTime секунд
      }, this.settings.heartbeatInterval * 1000);
    },

    close: async function () {
      clearTimeout(this.timers.open);
      clearTimeout(this.timers.pong);
      clearTimeout(this.timers.heartbeat);

      return new Promise((resolve) => {
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) resolve();

        console.warn('WS standart close: ' + this.access.account);

        this.ws.on('close', () => {
          console.warn('WS closed ' + this.access.account);
          this.ws = null;
          resolve();
        });
        this.ws.close(1000, 'Client shutdown');

        this.timers.closing = setTimeout(() => {
          if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            console.warn('WS force close: ' + this.access.account);
            this.ws.terminate();
            this.ws = null;
            resolve();
          }
        }, 5000);
      });
    },

    restart: function () {
      if (this.reconnect >= this.settings.maxReconnect) {
        console.error('Max reconnect attempts ' + this.access.account + ', stopping.');
        return;
      }

      if (this.timers.restart !== null) return;

      // const wait = (this.reconnect + 1) * this.settings.restartTime;
      const wait = Math.min(2 ** this.reconnect, 30) * this.settings.restartTime;
      // Попробуем подключиться через (Math.min(2^reconnect, 30) * 2 секунды) после разрыва
      console.log('Restarting WS ' + this.access.account + ' attempt: ' + this.reconnect + ', wait: ' + wait + ' sec');
      this.timers.restart = setTimeout(async () => {
        clearTimeout(this.timers.restart);
        this.timers.restart = null;
        this.reconnect++;
        await this.close();
        if (this.ws?.readyState !== WebSocket.OPEN) this.connect(this.access.sid);
      }, wait * 1000);
    },

    connect: function (sid) {
      console.log('Connecting WS ' + this.access.account);
      this.access.sid = sid;

      // Таймер на случай, если сервер не отвечает
      this.timers.open = setTimeout(() => {
        console.error('WS connection timeout ' + this.access.account + ', restarting...');
        this.restart();
      }, this.settings.connectTimeout * 1000);

      this.ws = new WebSocket('wss://wss.tradernet.com?SID=' + this.access.sid);

      this.ws.on('open', () => {
        console.log('WS connected ' + this.access.account);
        this.reconnect = 0; // Сброс попыток переподключения
        clearTimeout(this.timers.open);
        this.heartbeat(); // Запуск пинг-понга

        this.ws.send(JSON.stringify(['session']));
        this.ws.send(JSON.stringify(['orders']));
        // this.ws.send(JSON.stringify(['orderBook', ['AAPL.US', 'TSLA.US']]));
        // this.ws.send(JSON.stringify(['portfolio']));
      });

      this.ws.on('ping', () => {
        console.warn('get PING ' + this.access.account);
        this.ws.pong();
      });

      this.ws.on('pong', () => {
        console.warn('get PONG ' + this.access.account);
        this.heartbeat();
      });

      this.ws.on('message', (data) => {
        const [event, messageData] = JSON.parse(data);
        if (event === 'keepAlive') console.warn('WS keepAlive ' + this.access.account);
        else if (event === 'orders') {
          try {
            lib.tn.updateStatus({ account: this.access.account, orders: messageData });
          } catch (e) {
            console.error('onmessage error ' + this.access.account, { message: e.message || 'Unknown error' });
          }
          // } else if (event === 'b') {}
        } else if (event === 'userData') console.warn('userData ' + this.access.account, messageData);
        else console.error('WS new event ' + this.access.account + ' event: ' + event + ': ' + JSON.stringify(messageData));
      });

      this.ws.on('close', (event) => {
        clearTimeout(this.timers.closing);
        this.ws = null;
        console.warn('WS closed ' + this.access.account + ', code: ' + event.code);
        this.restart();
      });

      this.ws.on('error', (error) => {
        console.error('WS error ' + this.access.account, {
          message: error.message || 'Unknown error',
          readyState: this.ws?.readyState ?? 'undefined',
          closeCode: this.ws?._closeCode ?? 'N/A',
          reconnectAttempts: this.reconnect,
        });
        if (this.ws) {
          console.warn('WS state before restart ' + this.access.account, {
            url: this.ws._url || 'N/A',
            isPaused: this.ws._paused || false,
            bufferedAmount: this.ws._bufferedAmount || 0,
            autoPong: this.ws._autoPong || false,
          });
        }
        if (this.reconnect >= this.settings.maxReconnect) return;
        this.restart();
      });
    },
  };
};
