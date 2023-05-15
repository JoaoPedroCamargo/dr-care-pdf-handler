var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller.ts
var controller_exports = {};
__export(controller_exports, {
  generatePDF: () => generatePDF
});
module.exports = __toCommonJS(controller_exports);
var import_fs = __toESM(require("fs"));
var import_html_pdf = __toESM(require("html-pdf"));
var generatePDF = (res) => {
  const html = import_fs.default.readFileSync("index.html").toString();
  import_html_pdf.default.create(html, {
    type: "pdf",
    format: "A4",
    orientation: "portrait"
  }).toBuffer((err, buffer) => {
    if (err)
      return res.status(500).json(err);
    res.end(buffer);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generatePDF
});
