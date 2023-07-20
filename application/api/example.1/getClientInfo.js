/* eslint-disable camelcase */
({
  access: 'public',
  method: async () => {
    const { uuid, session, client } = context;
    const { ip } = client;
    const { token, user_id } = session;
    return { result: { ip, token, user_id, uuid } };
  },
});
