const express = require("express");
const app = express();

app.use(express.static("public"));

const ARA_TATIL = new Date("2026-01-18T00:00:00");

app.get("/target", (req, res) => {
  res.json({ target: ARA_TATIL.getTime() });
});

app.listen(3000, () => console.log("http://localhost:3000"));
