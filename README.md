<h1 align=center>:credit_card: ccc.js :heavy_check_mark:</h1>

---

<p align=center>Credit Card Check in JS</p>
<p align=center><i align=center>only for studies</i></p>

---

### Usage example

```javascript
const ccc = require("ccc.js");

ccc.config({
  // payment gateway url
  url: "http://localhost:3333/pay",
  method: "post",
  // replace credit card values to <CARD>, <MONTH>, <YEAR>, <CVV>
  data: `{"card": "<CARD>","month": "<MONTH>","year": "<YEAR>","cvv": "<CVV>"}`,
  headers: { "Content-Type": "application/json" },
  // keywords to search in gateway response
  keywords: {
    declined: "Declined",
    approved: "Approved"
  }
});

const CardNumber = "4444444444444444";
const CardMonth = "01";
const CardYear = "2020";
const CardCVV = "000";

async function example() {
  const Check = await ccc.check(CardNumber, CardMonth, CardYear, CardCVV);

  if (Check.error) {
    return console.log(Check.error);
  }

  if (Check.approved) {
    // approved
  }

  if (Check.declined) {
    // declined
  }
}

example();
```

---

### Credit Card Check API

<h5><strong>ccc</strong>.config(<i>Object</i> config)</h5>

<i>Example config</i>

```javascript
{
  // It is like axios config

  // `url` is the server URL that will be used for the request
  url: 'https://some-domain.com/api/',

  // CCC.JS: String to search in response body
  keywords: {
    declined: "Payment declined",
    approved: "Thank you! Payment success."
  }

  // `method` is the request method to be used when making the request
  method: 'post', // default is 'get'

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  // CCC.JS: replace CREDIT CARD values to <CARD>, <MONTH>, <YEAR>, <CVV>
  data: 'card_credit_number=<CVV>&card_cvv=<CVV>&card_year=<YEAR>',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default
}
```

<h5>ccc.check(cardNumber, cardMonth, cardYear, cardCVV)</h5>

Returns

```javascript
{
  error: String;
}
// or
{
  declined: true;
}
// or
{
  approved: true;
}
```

---

_Example: https://github.com/br0keh/cc-checker_
