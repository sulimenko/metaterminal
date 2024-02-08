/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ account, type = 'ptfin', login = null, password = null }) => {
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
    return { status: 'success', token: '123' };
  },
});
