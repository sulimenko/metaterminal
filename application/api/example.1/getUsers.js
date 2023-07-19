async ({ id }) => {
  const fields = ['id', 'user_id', 'login'];
  const where = { id };
  const data = await db.pg.select('terminal_users', fields, where);
  return { result: 'success', data };
};
