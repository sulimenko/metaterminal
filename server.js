'use strict';

if (process.env.NODE_ENV === 'development' && process.execArgv.length > 0) {
  // Strip execArgv to avoid invalid flags being forwarded to worker threads.
  process.execArgv.splice(0, process.execArgv.length);
}


require('impress');
