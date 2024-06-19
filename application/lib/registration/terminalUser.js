async ({ password, user }) => {
  const method = 'registration/terminal_user';
  const data = { password, user };

  return lib.ptfin.sendPost({ method, data });
};
