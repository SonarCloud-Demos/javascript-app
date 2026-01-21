// Intentionally noncompliant examples for Sonar rule demos.
// This file is not imported by the app.

/* eslint-disable */

function breakS2598_UnrestrictedFileUpload_Formidable() {
  // javascript:S2598 (File uploads should be restricted)
  const Formidable = require('formidable');

  const form = new Formidable(); // Noncompliant
  form.uploadDir = '/tmp/';
  form.keepExtensions = true;

  return form;
}

function breakS2755_XXE_Libxmljs() {
  // javascript:S2755 (XML parsers should not be vulnerable to XXE attacks)
  const libxmljs = require('libxmljs');
  const fs = require('fs');

  const xml = fs.readFileSync('xxe.xml', 'utf8');
  return libxmljs.parseXmlString(xml, {
    noblanks: true,
    noent: true, // Noncompliant
    nocdata: true,
  });
}

function breakS5527_DisableHostnameValidation() {
  // javascript:S5527 (Server hostnames should be verified during SSL/TLS connections)
  const https = require('node:https');

  const options = {
    hostname: 'www.example.com',
    port: 443,
    path: '/',
    method: 'GET',
    checkServerIdentity: function () {}, // Noncompliant
    secureProtocol: 'TLSv1_2_method',
  };

  return https.request(options, () => {});
}

module.exports = {
  breakS2598_UnrestrictedFileUpload_Formidable,
  breakS2755_XXE_Libxmljs,
  breakS5527_DisableHostnameValidation,
};
