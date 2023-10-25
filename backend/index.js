const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.set("Access-Control-Allow-Methods", "*");
//   res.set("x-requested-with", "XMLHttpRequest");
//   res.set("Access-Control-Expose-Headers", "Content-Encoding,api_key");
//   res.set("origin", "http://localhost:5173");
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   next();
// });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  console.log(req.query);
  let { addressName, placeName } = req.query;
  axios
    .get(
      `https://serpapi.com/search.json?engine=google&q=${placeName}&location=${addressName}%2C+Maharashtra%2C+India&google_domain=google.co.in&gl=in&hl=en&api_key=e7d0ddc6574954d1214f2c0168802452c11f7c91cbc97d70f62827a4572c2c9f`
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.response);
    });
});

app.listen(5000, () => {
  console.log("app is listening on port 5000");
});
