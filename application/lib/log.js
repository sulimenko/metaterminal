({
  write(level, ...args) {
    const line = this._formatCaller();
    const target = console[level] ? level : 'log';
    console[target](line, ...args);
  },

  error(...args) {
    this.write('error', ...args);
  },

  warn(...args) {
    this.write('warn', ...args);
  },

  info(...args) {
    this.write('info', ...args);
  },

  debug(...args) {
    this.write('debug', ...args);
  },

  trace(...args) {
    this.write('trace', ...args);
  },

  _formatCaller() {
    const err = new Error();
    const stack = err.stack ? err.stack.split('\n') : [];
    const line = stack.find((row) => row.includes(' at ') && !row.includes('application/lib/log.js'));
    if (!line) return '[unknown]';
    const match =
      line.match(/at (.+?) \\((.+?):(\\d+):(\\d+)\\)$/) ||
      line.match(/at (.+?):(\\d+):(\\d+)$/);
    if (match) {
      if (match.length === 5) {
        const fn = match[1];
        const file = match[2].replace(/^.*[\\\\/]/, '');
        const ln = match[3];
        const col = match[4];
        return `[${fn} ${file}:${ln}:${col}]`;
      }
      const file = match[1].replace(/^.*[\\\\/]/, '');
      const ln = match[2];
      const col = match[3];
      return `[${file}:${ln}:${col}]`;
    }

    const fallback = line.match(/([A-Za-z]:\\.+|\/[^:]+):(\d+):(\d+)/);
    if (!fallback) return '[unknown]';
    const file = fallback[1].replace(/^.*[\\\\/]/, '');
    const ln = fallback[2];
    const col = fallback[3];
    return `[${file}:${ln}:${col}]`;
  },
});
