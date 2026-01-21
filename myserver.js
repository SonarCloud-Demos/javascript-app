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

// ------------------------------
// SonarQube static-analysis test-only code
// NOTE: Intentionally includes insecure/unreliable/unmaintainable patterns.
// Do NOT enable in production.
// ------------------------------

function sonarBadSecurityExamples(req) {
  const hardCodedPassword = "P@ssw0rd123";
  const weakToken = Math.random().toString(36).slice(2);

  // Deprecated/insecure Buffer constructor usage (intentionally).
  const buf = new Buffer(String(req.query && req.query.data));

  // Dynamic RegExp from user input (potential ReDoS / injection).
  const userRegex = new RegExp(String(req.query && req.query.pattern));

  // Dangerous: eval (intentionally).
  const evalResult = eval(String(req.query && req.query.expr));

  return {
    hardCodedPassword,
    weakToken,
    buf: buf.toString("utf8"),
    userRegexSource: userRegex.source,
    evalResult,
  };
}

function sonarBadReliabilityExamples(input) {
  // parseInt without radix (intentionally).
  const number = parseInt(input);

  // Empty catch block (intentionally).
  try {
    JSON.parse(String(input));
  } catch (e) {}

  // Throwing asynchronously (intentionally).
  setTimeout(() => {
    throw new Error("Async crash for static analysis test");
  }, 0);

  return number;
}

function sonarBadMaintainabilityExamples(flagA, flagB, flagC) {
  // var + confusing nested ternary + duplicated conditions (intentionally).
  var status = flagA ? (flagB ? (flagC ? "A_B_C" : "A_B") : flagC ? "A_C" : "A") : flagB ? "B" : flagC ? "C" : "NONE";

  // Unused assignment (intentionally).
  const neverUsed = status + "-unused";
  void neverUsed;

  if (status === "A_B_C") {
    status = "A_B_C";
  }

  return status;
}

app.get("/api/sonar-bad", (req, res) => {
  const sec = sonarBadSecurityExamples(req);
  const rel = sonarBadReliabilityExamples(req.query && req.query.input);
  const maint = sonarBadMaintainabilityExamples(true, false, true);

  // Intentionally uses loose equality (for static analysis).
  if (req.query && req.query.admin == "true") {
    res.status(200).send({ sec, rel, maint, admin: true });
    return;
  }

  res.status(500).send({ sec, rel, maint, admin: false });
});

// ------------------------------
// SonarQube rule trigger snippets (test/demo only)
// These are written to be NON-EXECUTING at runtime.
// ------------------------------

if (false) {
  // javascript:S2598 (File uploads should be restricted)
  const Formidable = require("formidable");
  const form = new Formidable(); // Noncompliant
  form.uploadDir = "/tmp/";
  form.keepExtensions = true;

  // javascript:S2755 (XML parsers should not be vulnerable to XXE attacks)
  const libxmljs = require("libxmljs");
  const fs = require("fs");
  const xml = fs.readFileSync("xxe.xml", "utf8");
  libxmljs.parseXmlString(xml, {
    noblanks: true,
    noent: true, // Noncompliant
    nocdata: true,
  });

  // javascript:S5527 (Server hostnames should be verified during SSL/TLS connections)
  const https = require("node:https");
  const options = {
    hostname: "www.example.com",
    port: 443,
    path: "/",
    method: "GET",
    checkServerIdentity: function () {}, // Noncompliant
    secureProtocol: "TLSv1_2_method",
  };
  https.request(options, () => {});
}
