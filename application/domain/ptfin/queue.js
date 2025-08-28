({
  queue: [],

  concurrency: 20,
  count: 0,

  size: 0,
  sent: 0,

  waitTimeout: Infinity,
  processTimeout: Infinity,

  onTimeout: null,
  // eslint-disable-next-line no-unused-vars
  onSuccess: (res) => {
    // if (res.success?.[0]?.advice !== undefined) console.info(JSON.stringify(res.success[0].advice));
  },
  onFailure: (err, res) => console.error('Order error:', res, err),
  onDone: null,
  onDrain() {
    console.info('send drain. size:', this.size, 'sent:', this.sent);
    this.size = 0;
    this.sent = 0;
  },
  finish(error, res) {
    if (error && this.onFailure) this.onFailure(error, res);
    else if (this.onSuccess) this.onSuccess(res);
    if (this.onDone) this.onDone(error, res);
    if (this.count === 0 && this.onDrain) this.onDrain();
  },
  next(task) {
    this.count++;
    let timer = null;
    let finished = false;

    const finish = (error, res) => {
      if (finished) return;
      finished = true;
      if (timer) clearTimeout(timer);
      this.count--;
      this.finish(error, res);
      setTimeout(() => this.processQueue(), 0);
    };

    if (this.processTimeout !== Infinity) {
      timer = setTimeout(() => {
        timer = null;
        const err = new Error('Process timed out');
        finish(err, task);
      }, this.processTimeout);
    }
    this.send(task, finish);
  },
  processQueue() {
    if (this.queue.length === 0) return;
    if (this.count < this.concurrency) {
      const { task, start } = this.queue.shift();
      if (this.waitTimeout !== Infinity && Date.now() - start > this.waitTimeout) {
        this.finish(new Error('Waiting timed out'), task);
        this.processQueue();
        return;
      }
      this.next(task);
    }
  },
  addTask(task) {
    this.queue.push({ task, start: Date.now() });
    this.size++;
    if (this.queue.length === 1) this.processQueue();
  },
  async send({ path, data }, finish) {
    this.sent++;
    try {
      const result = await lib.ptfin.sendPost({ path, data });
      finish(null, result);
    } catch (error) {
      finish(error, null);
    }
  },
});
