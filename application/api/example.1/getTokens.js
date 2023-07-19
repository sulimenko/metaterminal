async () => {
  const fields = ['id', 'user_id', 'token'];
  const data = await db.pg.select('terminal_tokens', fields);
  return { result: 'success', data };
};
