/* eslint-disable camelcase */
({
  generateToken() {
    const { characters, secret, length } = config.sessions;
    return metarhia.metautil.generateToken(secret, characters, length);
  },

  async saveSession(token, data) {
    console.log({ saveSession: { token, data } });
    try {
      await db.pg.update('terminal_tokens', { data: JSON.stringify(data) }, { token });
    } catch (error) {
      console.error(error);
    }
  },

  async createSession(token, data, fields = {}) {
    const record = { token, data: JSON.stringify(data), ...fields };
    console.log({ createSession: record });
    await db.pg.delete('terminal_tokens', { login: data.login });
    return db.pg.insert('terminal_tokens', record);
  },

  async readSession(token) {
    const record = await db.pg.row('terminal_tokens', ['data'], { token });
    if (record && record.data) return record.data;
    return null;
  },

  async deleteSession(token) {
    return db.pg.delete('terminal_tokens', { token });
  },

  async registerUser({ userId, login, hash }) {
    return db.pg.insert('terminal_users', { user_id: userId, login, password: hash });
  },

  async getUser(login) {
    return db.pg.row('terminal_users', { login });
  },
});
