async ({ password, user }) => {
  const path = 'registration/terminal_user';
  const data = { password, user };

  return lib.ptfin.sendPost({ path, data });
};
