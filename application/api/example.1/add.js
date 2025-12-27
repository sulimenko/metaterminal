({
  access: 'public',

  parameters: {
    a: 'string',
    b: 'string',
  },

  method: async function ({ a, b }) {

    lib.log.info({ params: arguments[0] });
    if (a < 0) return new DomainError('EARGA');
    32;

    if (b > 500) return new DomainError('EARGB');
    if (Number.isNaN(a)) throw Error('Not a number: a');
    if (Number.isNaN(b)) throw Error('Not a number: b');
    const result = a + b;
    return result;
  },

  returns: 'string',

  errors: {
    EARGA: 'Invalid argument: "a" expected to be > 0',
    EARGB: 'Invalid argument: "b" expected to be < 500',
  },
});
