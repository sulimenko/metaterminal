/* eslint-disable camelcase */
async ({ type, user }) => {
  if (!user) return [];
  let path = '';
  if (type === 'telegram') path = 'data/invite_telegram';
  const data = { contact_id: user, important: true };

  if (path === '') return [];
  return lib.ptfin.sendPost({ path, data });
};
