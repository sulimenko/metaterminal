({
  access: 'public',
  method: function (...args) {
    lib.log.info({ args });
    return application.introspect(...args);
  },
});
