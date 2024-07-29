/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ user, password }) => {
    const response = await lib.instruction.terminalUser({ user, password });
    if (response.error) {
      if (response.status === 'duplication')
        return {
          error: true,
          status: 'success',
          text: 'У вас уже имеется пользотель.<br />Используйте имеющийся login для входа в терминал',
        };
      return { error: true, status: 'error', text: 'Ошибка во время создания!' };
    }
    // const contacts = await lib.ptfin.getContacts({ accounts: [account] });
    // let find = null;
    // for (const contact of contacts) {
    // for (const contract of contact.contracts) {
    // if (contract.name === account) find = contact;
    // }
    // }
    // console.log(find);
    // const hash = await metarhia.metautil.hashPassword(password);
    // await api.auth.provider.registerUser({ userId, type, login, hash });
    // const token = await context.client.startSession();
    return {
      error: false,
      status: 'success',
      text: 'Пользователь создан.<br />Ваш логин: ' + user.login,
    };
  },
});
