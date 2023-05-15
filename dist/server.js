var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));
var import_fs = require("fs");
var import_puppeteer = __toESM(require("puppeteer"));
var import_axios = __toESM(require("axios"));
var apiUrl = "https://api.adalo.com/v0/apps/35538164-b2d4-42d6-b3e4-ae3ef2a9f8e5/collections/t_f078e1a9b3f446b780fe026b12642665";
var apiUrlPost = "https://api.adalo.com/v0/apps/35538164-b2d4-42d6-b3e4-ae3ef2a9f8e5/collections/t_f078e1a9b3f446b780fe026b12642665";
var token = "aeetonwnsmfg78z9315z8cy8f";
var config = {
  headers: {
    "Authorization": "Bearer " + token
  }
};
var app = (0, import_express.default)();
app.use(import_body_parser.default.json());
app.get("/teste", async (req, res) => {
  let config2 = {
    headers: {
      "Authorization": "Bearer " + token
    }
  };
  await import_axios.default.get(apiUrl, config2).then(function(response) {
    console.log(response.data);
    res.send(response.data);
  }).catch(function(error) {
    console.error(error);
  }).finally(function() {
  });
});
app.post("/testePost", async (req, res) => {
  let config2 = {
    headers: {
      "Authorization": "Bearer " + token
    }
  };
  const { data } = req.body;
  for (let i = 0; i < 1e3; i++)
    await import_axios.default.post(apiUrlPost, data, config2).then(function(response) {
      console.log(response.data);
    }).catch(function(error) {
      console.error(error);
    }).finally(function() {
    });
});
app.get("/generate-pdf", async (req, res) => {
  const browser = await import_puppeteer.default.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });
  const page = await browser.newPage();
  const html = (0, import_fs.readFileSync)("./temp/sample.html", "utf-8");
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.emulateMediaType("screen");
  await page.pdf({
    path: "./temp/result.pdf",
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4"
  });
  await browser.close();
  const pdf = (0, import_fs.readFileSync)("./temp/result.pdf");
  res.contentType("application/pdf");
  res.send(pdf);
});
app.get("/getLink", async (req, res) => {
  res.send({ message: "https://google.com.br" });
});
app.listen(process.env.PORT || "3333", () => {
  console.log(`Servidor rodando na porta 3333`);
});
