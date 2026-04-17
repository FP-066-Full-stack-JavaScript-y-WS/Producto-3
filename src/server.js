import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});