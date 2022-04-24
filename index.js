const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
var express = require("express");
var app = express();
var namevar;
// middleware
app.use(express.json());
let a = 0;
app.use(express.urlencoded());
app.use(express.static("public"));
app.get("/", function (req, res) {
  console.log(req.body);
  res.sendFile(__dirname + "/test.pdf");
});

app.post("/", function (req, res) {
  console.log(req.body.name);
  namevar = req.body.name;
  run().catch((err) => console.log(err));
  res.sendFile(__dirname + "/test.pdf");
});

app.listen(3000);

async function run() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const { width, height } = page.getSize();

  const fontSize = 12;
  console.log("Sending", namevar);
  page.drawText(`Name : ${namevar}`, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  fs.writeFileSync("./test.pdf", await pdfDoc.save());
}
