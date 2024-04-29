({
  access: 'private',
  method: async () => {
    // console.log(context.session.state.user_id);
    const documents = await lib.ptfin.documents({ userId: context.session.state.user_id });
    // console.warn(typeof accounts, Object.keys(accounts));
    // context.session.documents.documents = Object.keys(documents);
    console.log('metaterminal documents :', documents);
    return documents;
  },
});
