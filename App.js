const express = require("express");
const QRCode = require("qrcode");
const app = express();
const PORT = 3500;

app.use(express.json);

app.get("/generateQR", async (req, res) => {
  try {
    const url = req.query.url || "https://example.com";
    const qrCodeImage = await QRCode.toDaraURL(url);
    res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/hello", (req, res) => {
  res.send("helllo");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
