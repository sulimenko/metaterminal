/* eslint-disable camelcase */
async ({ type, user }) => {
  if (!user) return [];
  let method = '';
  if (type === 'telegram') method = 'data/invite_telegram';
  const data = { contact_id: user, important: true };

  if (method === '') return [];
  return lib.ptfin.sendPost({ method, data });
};
