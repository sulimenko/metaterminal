({
  access: 'private',
  method: async (data) => {
    function generateRandomFourDigitNumber() {
      return Math.floor(Math.random() * 9000) + 1000;
    }
    // const randomFourDigitNumber = generateRandomFourDigitNumber();
    const code = generateRandomFourDigitNumber();

    // 1 ОТПРАВИТЬ СМС НА НОМЕР?

    // 2 СВЕРИТЬ КОД ИЗ СМС И ВВЕДЕНЫЙ КОД?

    console.log('phone:', data);
    return code;
  },
});
