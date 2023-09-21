/* eslint-disable camelcase */
({
  access: 'private',
  method: async ({ data }) => {
    console.log('metacom sendOrder', data);
    // return lib.ptfin({ accounts });
  },
});

// {
//    deal: {
//      general: {
//        symbol: 'AMC',
//        quantity: '259',
//        description: 'FUTURES DIRECTION',
//      },
//      orders: {
//        0: null,
//        1: {
//          action: 'sell',
//          type: 'market',
//          tif: 'day',
//        },
//      },
//    },
//    list: {
//      0: {
//        contact_id: 'd9b762a1-d96f-572e-5973-63bbf49621fc',
//        contract_id: '250422ba-715f-a988-b66b-644bbdfcb3ee',
//        account_id: 'PF20230072',
//        quantity: '259',
//      },
//    },
//    user: 'd9b762a1-d96f-572e-5973-63bbf49621fc'
// };
