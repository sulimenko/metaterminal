({
  access: 'public',
  method: function (...args) {
    lib.log.info({ params: args[0] });
    return application.introspect(...args);
  },
});
