const express = require("express");
const path = require("path");
const app = express();

const jsonServer = require("json-server");
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(express.static(__dirname + "/dist/windows-project"));

app.use(middlewares);
app.use(router);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/windows-project/index.html"));
});

app.listen(process.env.PORT || 5000);
