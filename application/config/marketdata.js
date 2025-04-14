({
  socket: {
    url: process.env.marketdata_url,
    options: process.env.marketdata_options,
    sessionid: process.env.marketdata_sessionid,
    sessionidsign: process.env.marketdata_sessionid_sign,
    imageurl: process.env.marketdata_image_url,
    userid: process.env.marketdata_user_id,
    tvecuid: process.env.marketdata_tv_ecuid,
  },
});
