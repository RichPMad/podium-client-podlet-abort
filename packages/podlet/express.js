const express = require("express");
const Podlet = require("@podium/podlet");

const app = express();

const podlet = new Podlet({
  name: "myPodlet",
  version: Date.now().toString(),
  pathname: "/",
  content: "/",
  fallback: "/fallback",
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend("podlet response " + Date.now() + new Array(652720).fill("!").join(""));
  // res.status(200).podiumSend(new Array(65535).fill("!").join(""));
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.listen(7100);
