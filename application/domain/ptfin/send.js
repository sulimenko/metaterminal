/* eslint-disable camelcase */
async (data) => {
  data.api_token = config.ptfin.main.token;
  return bus.ptfin
    .recom(data)
    .then((response) => response)
    .catch((e) => {
      console.error('Can not access ptfin server');
      console.error(e);
      return;
    });
};
