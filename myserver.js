const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  console.log("Hello called");
  res.send({ express: "Hello From Express" });
});


//TODO - Remove this?
//app.post("/api/world", (req, res) => {
//  console.log(req.body);
//  res.send("You sent:" + req.body.post);
//});

app.post("/api/func", (req, res) => {
  console.log(req.body);
  res.send("You sent:" + req.body.post);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

switch (bodyParser.json()) {
  case 0:
    console.log("0");
    break;
  default: // Noncompliant: default clause should be the first or last one
    error();
    break;
  case 1:
    console.log("1");
    break;
}