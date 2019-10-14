const axios = require("axios");

const Options = {
  config: Object
};

function config(ConfigObject = Object) {
  Options.config = ConfigObject;
}

async function check(
  card = String,
  month = String,
  year = String,
  cvv = String
) {
  // Payment Request Options
  let pRequestOptions = Options.config;

  let pRequestData = String(pRequestOptions.data)
    .replace("<CARD>", card)
    .replace("<YEAR>", year)
    .replace("<CVV>", cvv)
    .replace("<MONTH>", month);

  pRequestOptions.data = pRequestData;

  // Create Payment Request
  let pRequest = await axios(pRequestOptions).catch(() => {
    return { error: "Error on payment request." };
  });

  let pRequestResponse = JSON.stringify(pRequest.data);

  if (!pRequestResponse) return { error: "Error on payment request." };

  if (String(pRequestResponse).includes(pRequestOptions.keywords.approved)) {
    return { approved: true };
  } else if (
    String(pRequestResponse).includes(pRequestOptions.keywords.declined)
  ) {
    return { declined: true };
  } else {
    return { error: "Unknown error." };
  }
}

module.exports.check = check;
module.exports.config = config;
